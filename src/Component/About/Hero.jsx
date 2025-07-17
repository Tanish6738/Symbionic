import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useLayoutEffect(() => {
    const heroElement = heroRef.current;
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;

    // --- ENTRANCE ANIMATION ENHANCEMENT ---
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroElement,
        start: 'top 80%', // When the top of the hero section is 80% from the top of the viewport
        toggleActions: 'play none none none', // Play once when triggered
        // markers: true, // Uncomment for debugging ScrollTrigger
      },
      delay: 0.2, // Small delay before the animation starts
    });

    // Animate the title with a slight upward slide, fade, and a quick skew
    entranceTl.fromTo(
      titleElement,
      { y: 50, opacity: 0, skewX: 5, autoAlpha: 0 }, // Initial state: slightly down, transparent, skewed
      { y: 0, opacity: 1, skewX: 0, autoAlpha: 1, duration: 1.2, ease: 'power3.out' }
    );

    // Animate the subtitle with a similar effect, slightly delayed
    entranceTl.fromTo(
      subtitleElement,
      { y: 30, opacity: 0, autoAlpha: 0 }, // Initial state: slightly down, transparent
      { y: 0, opacity: 1, autoAlpha: 1, duration: 1, ease: 'power3.out' },
      "-=0.7" // Starts 0.7s before the title animation ends
    );
    // --- END ENTRANCE ANIMATION ENHANCEMENT ---


    // Your existing scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
        pinSpacing: false,
        // markers: true, // Uncomment for debugging ScrollTrigger
      },
    });

    tl.to(titleElement, {
      scale: 0.5,
      opacity: 0,
      y: '-50%',
    }).to(subtitleElement, {
      opacity: 0,
      y: '-50%',
    }, "<"); // "<" means simultaneously with the previous tween

    return () => {
      // It's good practice to kill all tweens and ScrollTriggers associated with elements
      // when the component unmounts.
      gsap.killTweensOf(titleElement);
      gsap.killTweensOf(subtitleElement);
      if (entranceTl) entranceTl.kill();
      if (tl) tl.kill();
      // Also, ensure ScrollTriggers are cleaned up properly
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 flex items-center justify-center text-white overflow-hidden">
      <div className="text-center">
        {/* Initially hide elements with opacity:0 and potentially transform them slightly for better starting points */}
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-center drop-shadow-lg opacity-0">Welcome to Symbionic</h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl mt-4 drop-shadow-md opacity-0">A new era of technology.</p>
      </div>
    </section>
  );
}