import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

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
          markers: true, // remove in prod
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
            <div className="text-center">
              <h1 className="text-6xl mb-4">Our Products</h1>
              <p className="text-xl">Innovative Solutions for Tomorrow</p>
            </div>
          </div>

          {/* Section 2 - Product Feature 1 */}
          <div
            ref={(el) => (sectionsRef.current[1] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-green-600 to-teal-700"
            style={{ flexShrink: 0 }}
          >
            <div className="text-center">
              <h2 className="text-5xl mb-4">AI-Powered Analytics</h2>
              <p className="text-xl">Transform your data into insights</p>
            </div>
          </div>

          {/* Section 3 - Product Feature 2 */}
          <div
            ref={(el) => (sectionsRef.current[2] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-orange-600 to-red-700"
            style={{ flexShrink: 0 }}
          >
            <div className="text-center">
              <h2 className="text-5xl mb-4">Cloud Integration</h2>
              <p className="text-xl">Seamless connectivity everywhere</p>
            </div>
          </div>

          {/* Section 4 - Product Feature 3 */}
          <div
            ref={(el) => (sectionsRef.current[3] = el)}
            className="h-screen w-screen flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-br from-indigo-600 to-pink-700"
            style={{ flexShrink: 0 }}
          >
            <div className="text-center">
              <h2 className="text-5xl mb-4">Advanced Security</h2>
              <p className="text-xl">Your data, protected always</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Section - Call to Action */}
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="text-center max-w-4xl px-8">
          <h2 className="text-6xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-2xl mb-8 text-gray-300">
            Join thousands of companies already using our products to transform their business
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
