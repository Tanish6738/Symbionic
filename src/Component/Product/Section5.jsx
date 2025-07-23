import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltedCard from "../Effect/TitledCard";

gsap.registerPlugin(ScrollTrigger);

export default function Section5() {
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
          scrub: true,
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
            <span className="text-cyan-400">Command the Road</span> with Confidence.
          </h2>

          <ul className="space-y-2 sm:space-y-3 text-white/95 text-sm sm:text-base lg:text-base xl:text-lg leading-relaxed mb-4 sm:mb-6">
            <li className="flex items-center justify-center lg:justify-start gap-2">
              <span><strong>Secure Grip:</strong> Confident hold on handlebars.</span>
            </li>
            <li className="flex items-center justify-center lg:justify-start gap-2">
              <span><strong>Vibration Control:</strong> Less fatigue, smoother rides.</span>
            </li>
            <li className="flex items-center justify-center lg:justify-start gap-2">
              <span><strong>Weatherproof:</strong> Rides through rain, dust, or shine.</span>
            </li>
            <li className="flex items-center justify-center lg:justify-start gap-2">
              <span><strong>Aerodynamic Shape:</strong> Sleek and responsive.</span>
            </li>
          </ul>

          <div className="flex justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-cyan-500/50">
              Add Riding Assist
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md order-first lg:order-last">
          <TiltedCard
            imageSrc="/Images/Ride.png"
            altText="Krea Riding Assist - Grip and Ride Enhancer"
            captionText="Krea Riding Assist"
            containerHeight="400px"
            imageHeight="350px"
            imageWidth="350px"
            scaleOnHover={1.05}
            rotateAmplitude={12}
            showMobileWarning={false}
            showTooltip={true}
          />
        </div>

      </div>
    </section>
  );
}
