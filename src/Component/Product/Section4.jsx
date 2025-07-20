import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section4() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          scrub: true, // <- added for smooth scroll-tied effect
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-white py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8 w-full">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 leading-tight">
            <span className="text-blue-400">Everyday Tasks</span>, Made Effortless.
          </h2>

          <ul className="space-y-2 sm:space-y-3 text-white/95 text-sm sm:text-base lg:text-base xl:text-lg leading-relaxed mb-4 sm:mb-6">
            <li className="flex items-center justify-center lg:justify-start gap-2">
              <span><strong>Precision Handling:</strong> For fine tasks like buttoning or using tools.</span>
            </li>
            <li className="flex items-center justify-center lg:justify-start gap-2">
              <span><strong>Multi-Grip Support:</strong> Hold everything from mugs to screwdrivers.</span>
            </li>
            <li className="flex items-center justify-center lg:justify-start gap-2">
              <span><strong>Tactile Feedback:</strong> Feel what you’re doing.</span>
            </li>
            <li className="flex items-center justify-center lg:justify-start gap-2">
              <span><strong>Light & Comfortable:</strong> Use it all day, every day.</span>
            </li>
          </ul>

          <div className="flex justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-500/50">
              Add Utility Assist
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md order-first lg:order-last">
          <div className="bg-gradient-to-tr from-blue-500/30 to-white/10 p-3 sm:p-4 md:p-5 lg:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-blue-500/20 hover:shadow-blue-500/25 transition-all duration-300">
            <img
              src="/Images/Utility.png"
              alt="Krea Utility Assist - Precision Everyday Tool"
              className="w-full h-auto object-contain rounded-xl sm:rounded-2xl drop-shadow-lg"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
