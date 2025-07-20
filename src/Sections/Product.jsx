import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import FinalCTA from "../Component/Product/FinalCTA";
import Section2 from "../Component/Product/Section2";
import Section3 from "../Component/Product/Section3";
import Section4 from "../Component/Product/Section4";
import Section5 from "../Component/Product/Section5";
import Hero from "../Component/Product/Hero";
import Section6 from "../Component/Product/Section6";
import Section7 from "../Component/Product/Section7";

gsap.registerPlugin(ScrollTrigger);

const Product = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({ 
      smooth: true,
      duration: 1.2
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      
      if (!container || !wrapper) return;

      // Calculate scroll distance to show all sections fully
      const scrollDistance = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: () => `-${scrollDistance}`,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: wrapper,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

    });

    // Cleanup function
    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Horizontal scroll container */}
      <div 
        ref={wrapperRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div
          ref={containerRef}
          className="flex h-screen w-max will-change-transform"
        >
          {/* Section 1 - Product Hero */}
          <div
            ref={(el) => (sectionsRef.current[0] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-700"
            style={{ flexShrink: 0 }}
          >
            <Hero/>
          </div>
          {/* Section 1 - Product Hero */}
          <div
            ref={(el) => (sectionsRef.current[0] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-700"
            style={{ flexShrink: 0 }}
          >
            <Section2/>
          </div>

          {/* Section 2 - Product Limb */}
          <div
            ref={(el) => (sectionsRef.current[1] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-green-600 to-teal-700"
            style={{ flexShrink: 0 }}
          >
            <Section3/>
          </div>

          {/* Section 3 - Product GYM  */}
          <div
            ref={(el) => (sectionsRef.current[2] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-orange-600 to-red-700"
            style={{ flexShrink: 0 }}
          >
            <Section4/>
          </div>

          {/* Section 4 - Product RIDE */}
          <div
            ref={(el) => (sectionsRef.current[3] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-indigo-600 to-pink-700"
            style={{ flexShrink: 0 }}
          >
            <Section5/>
          </div>
          {/* Section 5 - Product Feature 4 */}
          <div
            ref={(el) => (sectionsRef.current[4] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-indigo-600 to-pink-700"
            style={{ flexShrink: 0 }}
          >
            <Section6/>
          </div>
          {/* Section 6 - Product Feature 5 */}
          <div
            ref={(el) => (sectionsRef.current[5] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-indigo-600 to-pink-700"
            style={{ flexShrink: 0 }}
          >
            <Section7/>
          </div>

        </div>
      </div>

      {/* Final Section - Call to Action */}
     <FinalCTA/>
    </div>
  );
};

export default Product;
