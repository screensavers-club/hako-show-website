"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect } from "react";
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

function TexturedBox() {
  const textures = useTexture(FACE_TEXTURES);

  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      {textures.map((tex, i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} map={tex} />
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
    const boundingRadius = Math.sqrt(3); // half-diagonal of 2x2x2 box
    // Constrain to the tighter viewport dimension
    const fitDim = Math.min(1, aspect);
    cam.fov = 2 * THREE.MathUtils.radToDeg(
      Math.atan(boundingRadius / (0.85 * fitDim * distance))
    );
    cam.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

useTexture.preload(FACE_TEXTURES);

export default function Scene() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <AdaptiveCamera />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <TexturedBox />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
