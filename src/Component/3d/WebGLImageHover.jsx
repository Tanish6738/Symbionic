// src/3d/WebGLImageHover.jsx
import { useRef, useState, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import vertexShader from "./shaders/hoverVertex.glsl";
import fragmentShader from "./shaders/hoverFragment.glsl";

const HoverShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uHover: 0,
    uTime: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ HoverShaderMaterial });

export default function WebGLImageHover({ image }) {
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = new THREE.TextureLoader().load(image);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uTexture = texture;
    }
  }, [texture]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uHover += (hovered ? 1 : 0 - materialRef.current.uHover) * 0.05;
    }
  });

  return (
    <mesh
      scale={[2.2, 2.75, 1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <hoverShaderMaterial ref={materialRef} />
    </mesh>
  );
}
