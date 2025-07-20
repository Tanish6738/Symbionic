import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  MeshWobbleMaterial,
  Sparkles,
} from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";
import {VerticalSpiral, ExplodingTorus} from "../3d/Element";

export default function Genesis({ scene2Ref }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={scene2Ref}
      // className="story-scene bg-gradient-to-tr from-orange-900 via-black to-gray-900 text-white"
      className="story-scene bg-black text-white relative overflow-hidden min-h-screen md:min-h-auto"
    >
      {/* Import Parisienne font */}
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Parisienne&family=Tangerine:wght@400;700&display=swap');
      </style>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center z-10 px-4">
        <p className="text-xl md:text-2xl mb-4 symbionic-reveal text-gray-300">
          It began with a spark — and became
        </p>
        <h2
          style={{
            fontFamily: `'Tangerine', cursive`,
            fontWeight: "700",
          }}
          className="text-5xl md:text-7xl font-extrabold mb-8 brand-name-animation text-orange-500 drop-shadow-md"
        >
          Symbionic
        </h2>
        <p className="text-xl md:text-2xl symbionic-reveal text-gray-300">
          Not just a prosthetic arm.
        </p>
        <p className="text-xl md:text-2xl symbionic-reveal text-gray-300">
          A mission to restore{" "}
          <strong className="text-orange-400">freedom</strong> — to move, live,
          and thrive without limits.
        </p>
      </div>

      {/* 3D Canvas Background */}
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4299E1" />
        <Suspense fallback={null}>
          {/* Only show spiral on larger screens */}
          {!isMobile && (
            <VerticalSpiral position={[6, 0, 0]} turns={5} color="#222" />
          )}

          <ExplodingTorus
            position={isMobile ? [0, 0, 0] : [-6, 0, 0]}
            color="#FF6A00"
          />

          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </section>
  );
}
