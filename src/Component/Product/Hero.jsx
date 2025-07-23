import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChainVisual,
  DiamondSymbol,
  DoubleChainTorus,
  ExplodingTorus,
  InclinedBrick,
  VerticalSpiral,
} from "../3d/Element";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ctaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section className="w-full min-h-screen bg-black text-white relative flex flex-col items-center justify-center overflow-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-white/5 to-black opacity-20 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.5}
            color="#4299E1"
          />
          <React.Suspense fallback={null}>
            {!isMobile && (
              <>
                <VerticalSpiral position={[-6, 0, 0]} turns={5} color="#222" />
                <ChainVisual
                  position={isMobile ? [0, -5, 0] : [6, -5, 0]}
                  color="#FBBF24"
                />
              </>
            )}
            {/* only mobile */}
            {isMobile && (
              <ExplodingTorus
                position={isMobile ? [0, 0, 0] : [6, 0, 0]}
                color="red"
              />
            )}
            <Environment preset="studio" />
          </React.Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          <span className="text-orange-500">Unleash</span> Your Limitless
          Potential.
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-10">
          Engineered for Every Endeavor. Designed for You.
        </p>
        <div ref={ctaRef}>
          <a
            href="#features"
            className="inline-block px-8 py-4 text-white bg-orange-500 hover:bg-orange-600 text-lg font-semibold rounded-2xl transition duration-300 shadow-xl"
          >
            Discover Krea Adaptive
          </a>
        </div>
      </div>
    </section>
  );
}
