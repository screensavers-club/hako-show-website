"use client";

import { Canvas, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useCallback } from "react";
import * as THREE from "three";

// Box face order: +X (right), -X (left), +Y (top), -Y (bottom), +Z (front), -Z (back)
const FACE_TEXTURES = [
  "/tex/hako_tex_right.jpg",
  "/tex/hako_tex_left.jpg",
  "/tex/hako_tex_top.jpg",
  "/tex/hako_tex_bottom.jpg",
  "/tex/hako_tex_front.jpg",
  "/tex/hako_tex_back.jpg",
];

const S = 1024; // canvas texture size
const STAMP_SCALE = 0.3;

const STAMPS = [
  "/stamp/crab.png",
  "/stamp/gravy.png",
  "/stamp/kelly.png",
  "/stamp/krome.png",
  "/stamp/overlyunseasoned.png",
  "/stamp/siah.png",
];

// ---------------------------------------------------------------------------
// Face-edge adjacency with UV transforms.
//
// For each of the 6 faces, 4 edges: [left (u<0), right (u>1), top (v>1), bottom (v<0)].
// Each entry: [neighborFace, a, b, c, d, e, f]
//   where destination UV = (a*u + b*v + c,  d*u + e*v + f)
//
// Derived from THREE.BoxGeometry UV layout for a 2×2×2 box at origin.
// ---------------------------------------------------------------------------
const ADJ: number[][][] = [
  // Face 0 (+X)
  [[4,1,0,1,0,1,0],[5,1,0,-1,0,1,0],[2,0,-1,2,1,0,0],[3,0,1,1,-1,0,1]],
  // Face 1 (-X)
  [[5,1,0,1,0,1,0],[4,1,0,-1,0,1,0],[2,0,1,-1,-1,0,1],[3,0,-1,0,1,0,0]],
  // Face 2 (+Y)
  [[1,0,-1,1,1,0,1],[0,0,1,0,-1,0,2],[5,-1,0,1,0,-1,2],[4,1,0,0,0,1,1]],
  // Face 3 (-Y)
  [[1,0,1,0,-1,0,0],[0,0,-1,1,1,0,-1],[4,1,0,0,0,1,-1],[5,-1,0,1,0,-1,0]],
  // Face 4 (+Z)
  [[1,1,0,1,0,1,0],[0,1,0,-1,0,1,0],[2,1,0,0,0,1,-1],[3,1,0,0,0,1,1]],
  // Face 5 (-Z)
  [[0,1,0,1,0,1,0],[1,1,0,-1,0,1,0],[2,-1,0,1,0,-1,2],[3,-1,0,1,0,-1,0]],
];

function drawRotatedStamp(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  cx: number,
  cy: number,
  w: number,
  h: number,
  angle: number,
) {
  ctx.save();
  ctx.translate(cx + w / 2, cy + h / 2);
  ctx.rotate(angle);
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  ctx.restore();
}

function drawStampOnFaces(
  stampImg: CanvasImageSource,
  canvases: HTMLCanvasElement[],
  materials: THREE.MeshBasicMaterial[],
  faceIdx: number,
  u: number,
  v: number,
  stampW: number,
  stampH: number,
  angle: number,
) {
  // Canvas-pixel position of the stamp on the clicked face
  const cx = u * S - stampW / 2;
  const cy = (1 - v) * S - stampH / 2;

  // Draw on clicked face
  const ctx = canvases[faceIdx].getContext("2d")!;
  drawRotatedStamp(ctx, stampImg, cx, cy, stampW, stampH, angle);
  materials[faceIdx].map!.needsUpdate = true;

  // Detect which edges overflow
  const uMin = u - stampW / (2 * S);
  const uMax = u + stampW / (2 * S);
  const vMin = v - stampH / (2 * S);
  const vMax = v + stampH / (2 * S);

  const overflows: number[] = [];
  if (uMin < 0) overflows.push(0); // left
  if (uMax > 1) overflows.push(1); // right
  if (vMax > 1) overflows.push(2); // top
  if (vMin < 0) overflows.push(3); // bottom

  // Draw the overflow portion on each neighbor face.
  // We apply the UV→canvas affine transform via setTransform, then draw the
  // stamp at its *original* canvas position; the transform maps it onto the
  // neighbor canvas and the canvas boundary clips the non-overlapping part.
  for (const edgeIdx of overflows) {
    const [nFace, a, b, c, d, e, f] = ADJ[faceIdx][edgeIdx];
    const nCtx = canvases[nFace].getContext("2d")!;
    nCtx.save();
    // Convert UV-space affine to canvas-pixel-space affine
    nCtx.setTransform(a, -d, -b, e, (b + c) * S, (1 - e - f) * S);
    drawRotatedStamp(nCtx, stampImg, cx, cy, stampW, stampH, angle);
    nCtx.restore();
    materials[nFace].map!.needsUpdate = true;
  }
}

function TexturedBox() {
  const faceTextures = useTexture(FACE_TEXTURES);
  const stampTextures = useTexture(STAMPS);

  const { canvases, materials } = useMemo(() => {
    const canvases: HTMLCanvasElement[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];

    faceTextures.forEach((tex) => {
      const canvas = document.createElement("canvas");
      canvas.width = S;
      canvas.height = S;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(tex.image as CanvasImageSource, 0, 0, S, S);

      const canvasTex = new THREE.CanvasTexture(canvas);
      canvasTex.colorSpace = THREE.SRGBColorSpace;

      canvases.push(canvas);
      materials.push(new THREE.MeshBasicMaterial({ map: canvasTex }));
    });

    return { canvases, materials };
  }, [faceTextures]);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (!e.face || !e.uv) return;

      const stamp = stampTextures[Math.floor(Math.random() * stampTextures.length)];
      const img = stamp.image as HTMLImageElement;
      const aspect = img.naturalWidth / img.naturalHeight;
      const stampW = S * STAMP_SCALE;
      const stampH = stampW / aspect;
      const angle = Math.random() * Math.PI * 2;

      drawStampOnFaces(
        img, canvases, materials,
        e.face.materialIndex,
        e.uv.x, e.uv.y,
        stampW, stampH,
        angle,
      );
    },
    [canvases, materials, stampTextures],
  );

  return (
    <mesh onClick={handleClick}>
      <boxGeometry args={[2, 2, 2]} />
      {materials.map((mat, i) => (
        <primitive key={i} object={mat} attach={`material-${i}`} />
      ))}
    </mesh>
  );
}

function AdaptiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const distance = cam.position.length();
    const aspect = size.width / size.height;
    const boundingRadius = Math.sqrt(3);
    const fitDim = Math.min(1, aspect);
    cam.fov = 2 * THREE.MathUtils.radToDeg(
      Math.atan(boundingRadius / (0.85 * fitDim * distance))
    );
    cam.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

useTexture.preload(FACE_TEXTURES);
useTexture.preload(STAMPS);

export default function Scene() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }} gl={{ toneMapping: THREE.NoToneMapping }}>
      <AdaptiveCamera />
      <TexturedBox />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
