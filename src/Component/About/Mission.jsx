import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Mission({ scene4Ref }) {
  const missionTitleRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    if (!scene4Ref.current || !missionTitleRef.current || !headingRef.current) return;

    gsap.set([missionTitleRef.current, headingRef.current], {
      opacity: 0,
      y: 40,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene4Ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(missionTitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }).to(
      headingRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    );
  }, []);

  useEffect(() => {
    const fallback = setTimeout(() => {
      [missionTitleRef.current, headingRef.current].forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0px)';
        }
      });
    }, 3000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      {/* Import Parisienne font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Parisienne&family=Tangerine:wght@400;700&display=swap');`}
      </style>

      <section
        ref={scene4Ref}
        className="story-scene relative bg-gradient-to-tl from-orange-900 via-black to-gray-900 text-white overflow-hidden min-h-screen flex items-center justify-center px-6 py-16"
      >
        <div
          className="absolute inset-0 background-visual"
          style={{
            backgroundImage: `url('/Images/mission-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
          }}
        ></div>

        <div className="z-10 max-w-3xl text-center space-y-6 backdrop-blur-md bg-black/30 p-8 rounded-2xl shadow-2xl">
          <h2
            ref={missionTitleRef}
            className="text-5xl md:text-6xl text-white drop-shadow-lg"
            style={{
              fontFamily: `'Parisienne', cursive`,
            }}
          >
            Our Mission
          </h2>

          <h3
            ref={headingRef}
            className="text-2xl md:text-3xl font-semibold text-orange-400 leading-snug"
          >
            Empower amputees with world-class, dignified, and accessible prosthetics.
          </h3>
        </div>
      </section>
    </>
  );
}
