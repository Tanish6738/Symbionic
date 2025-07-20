// HeroSection.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ctaRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <section className="w-full h-screen bg-black text-white relative flex items-center justify-center overflow-hidden">
      {/* Subtle dynamic background gradient or blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-white/5 to-black opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          <span className="text-orange-500">Unleash</span> Your Limitless Potential.
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-10">
          Engineered for Every Endeavor. Designed for You.
        </p>

        <div ref={ctaRef}>
          <a
            href="#features"
            className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-black text-lg font-semibold rounded-2xl transition duration-300 shadow-xl"
          >
            Discover Krea Adaptive
          </a>
        </div>
      </div>
    </section>
  );
}
