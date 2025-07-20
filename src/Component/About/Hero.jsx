import React, { useRef, useLayoutEffect, Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { ExplodingTorus, VerticalSpiral } from '../3d/Element';

gsap.registerPlugin(ScrollTrigger);


export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    const entrance = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    entrance.fromTo(
      title,
      { y: 80, opacity: 0, skewY: 5 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.3, ease: 'power3.out' }
    );

    entrance.fromTo(
      subtitle,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      "-=1"
    );

    const scrollAnim = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    scrollAnim
      .to(title, { opacity: 0, y: '-50%' })
      .to(subtitle, { opacity: 0, y: '-50%' }, "<");

    return () => {
      gsap.killTweensOf([title, subtitle]);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full bg-black text-white overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4299E1" />
        <Suspense fallback={null}>
          {/* Central floating sphere */}

          {!isMobile && (
            <VerticalSpiral position={[-6, 0, 0]} turns={5} color="#222" />
          )}
          {/* ExplodingTorus - center on mobile, right side on desktop */}
          <ExplodingTorus 
            position={isMobile ? [0, 0, 0] : [6, 0, 0]} 
            color="#10B981" 
          />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center z-10 px-4">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold opacity-0 drop-shadow-lg"
        >
          Welcome to
          <span className="text-orange-500"> Symbionic</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl mt-4 opacity-0 drop-shadow-md text-gray-300"
        >
          A new era of technology.
        </p>
      </div>
    </section>
  );
}


