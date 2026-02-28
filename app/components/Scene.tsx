"use client";

import { Canvas, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useRef, useMemo, useCallback } from "react";
import * as THREE from "three";

// Box face order: +X (right), -X (left), +Y (top), -Y (bottom), +Z (front), -Z (back)
const FACE_TEXTURES = [
  "/tex/box-back.jpg",
  "/tex/box-back.jpg",
  "/tex/box-flat.jpg",
  "/tex/box-flat.jpg",
  "/tex/hako-front.jpg",
  "/tex/box-back.jpg",
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

// Each entry: [stampIndex, faceIndex, u, v, angle]
type StampEntry = [number, number, number, number, number];

// Paste your captured stamps here:
const DEFAULT_STAMPS: StampEntry[] = [[2,4,0.588551253402031,0.9865321536742868,5.864885447653136],[0,0,0.40143776121694863,0.6488152723347522,3.064103104769041],[0,4,0.5511567189201052,0.031716662531871886,5.252740108566679],[1,0,0.03190633674434462,0.2908859462991693,0.9359248371946877],[4,4,0.05521181914245887,0.8437371623669496,0.11699266117937789],[5,4,0.969458143019382,0.7148271824932597,3.224630173064175],[1,4,0.8988894258271728,0.9169033541042344,2.898015257321131],[3,4,0.3331216911738675,0.9780811807448366,1.2751774999993328],[3,0,0.5139871935390032,0.2568371606827613,4.077438551709822],[5,0,0.8542628865179783,0.9083832057661281,1.0869933198120554],[3,0,0.7505590319839683,0.5572620123413006,3.280131602770471],[0,5,0.6953208056904384,0.5163665760831385,2.218773001634088],[3,5,0.6159203253323562,0.9276708132865273,0.9403637054280312],[4,1,0.45926836971377605,0.3389379882645934,4.9999787101659185],[5,1,0.727808395397427,0.03271508517149535,2.903797083601369],[2,3,0.6811690819037226,0.20301354256003312,5.841239837093392],[1,5,0.29057327476646605,0.3671035838415671,0.1862421574237744],[3,2,0.015156846383185096,0.4923865813949038,5.328897032866062],[2,2,0.8884417051778308,0.5310481051944447,2.0080524480857638]];

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
  [
    [4, 1, 0, 1, 0, 1, 0],
    [5, 1, 0, -1, 0, 1, 0],
    [2, 0, -1, 2, 1, 0, 0],
    [3, 0, 1, 1, -1, 0, 1],
  ],
  // Face 1 (-X)
  [
    [5, 1, 0, 1, 0, 1, 0],
    [4, 1, 0, -1, 0, 1, 0],
    [2, 0, 1, -1, -1, 0, 1],
    [3, 0, -1, 0, 1, 0, 0],
  ],
  // Face 2 (+Y)
  [
    [1, 0, -1, 1, 1, 0, 1],
    [0, 0, 1, 0, -1, 0, 2],
    [5, -1, 0, 1, 0, -1, 2],
    [4, 1, 0, 0, 0, 1, 1],
  ],
  // Face 3 (-Y)
  [
    [1, 0, 1, 0, -1, 0, 0],
    [0, 0, -1, 1, 1, 0, -1],
    [4, 1, 0, 0, 0, 1, -1],
    [5, -1, 0, 1, 0, -1, 0],
  ],
  // Face 4 (+Z)
  [
    [1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, -1, 0, 1, 0],
    [2, 1, 0, 0, 0, 1, -1],
    [3, 1, 0, 0, 0, 1, 1],
  ],
  // Face 5 (-Z)
  [
    [0, 1, 0, 1, 0, 1, 0],
    [1, 1, 0, -1, 0, 1, 0],
    [2, -1, 0, 1, 0, -1, 2],
    [3, -1, 0, 1, 0, -1, 0],
  ],
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

  // Track placed stamps for export
  const stampLog = useRef<StampEntry[]>([]);

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

  // Helper to apply a stamp entry
  const applyStamp = useCallback(
    (entry: StampEntry) => {
      const [stampIdx, face, u, v, angle] = entry;
      const stamp = stampTextures[stampIdx];
      const img = stamp.image as HTMLImageElement;
      const aspect = img.naturalWidth / img.naturalHeight;
      const stampW = S * STAMP_SCALE;
      const stampH = stampW / aspect;
      drawStampOnFaces(img, canvases, materials, face, u, v, stampW, stampH, angle);
    },
    [canvases, materials, stampTextures],
  );

  // Redraw base textures then replay all stamps in the log
  const redrawAll = useCallback(() => {
    faceTextures.forEach((tex, i) => {
      const ctx = canvases[i].getContext("2d")!;
      ctx.drawImage(tex.image as CanvasImageSource, 0, 0, S, S);
      materials[i].map!.needsUpdate = true;
    });
    for (const entry of stampLog.current) {
      applyStamp(entry);
    }
  }, [faceTextures, canvases, materials, applyStamp]);

  // Apply default stamps on first render
  const preStamped = useRef(false);
  useEffect(() => {
    if (preStamped.current || DEFAULT_STAMPS.length === 0) return;
    preStamped.current = true;
    for (const entry of DEFAULT_STAMPS) {
      applyStamp(entry);
    }
  }, [applyStamp]);

  // Expose export function on window for console access
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__exportStamps = () => {
      const json = JSON.stringify(stampLog.current);
      console.log("Copy this into DEFAULT_STAMPS:\n" + json);
      navigator.clipboard.writeText(json).then(
        () => console.log("(Copied to clipboard!)"),
        () => {},
      );
      return json;
    };
    (window as unknown as Record<string, unknown>).__clearStamps = () => {
      stampLog.current = [];
      redrawAll();
      console.log("Stamps cleared! Start fresh.");
    };
    return () => {
      delete (window as unknown as Record<string, unknown>).__exportStamps;
      delete (window as unknown as Record<string, unknown>).__clearStamps;
    };
  }, [canvases, materials, faceTextures]);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (!e.face || !e.uv) return;

      // Shift+click = undo last stamp
      if (e.nativeEvent.shiftKey) {
        if (stampLog.current.length === 0) return;
        stampLog.current.pop();
        redrawAll();
        return;
      }

      const stampIdx = Math.floor(Math.random() * stampTextures.length);
      const angle = Math.random() * Math.PI * 2;
      const entry: StampEntry = [
        stampIdx,
        e.face.materialIndex,
        e.uv.x,
        e.uv.y,
        angle,
      ];

      stampLog.current.push(entry);
      applyStamp(entry);
    },
    [stampTextures, applyStamp, redrawAll],
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
    cam.fov =
      2 *
      THREE.MathUtils.radToDeg(
        Math.atan(boundingRadius / (0.85 * fitDim * distance)),
      );
    cam.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

useTexture.preload(FACE_TEXTURES);
useTexture.preload(STAMPS);

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [3, 3, 3] }}
      gl={{ toneMapping: THREE.NoToneMapping }}
    >
      <AdaptiveCamera />
      <TexturedBox />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
