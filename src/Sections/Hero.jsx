import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import HeroBackground from "../Component/HeroBackground";

const Hero = () => {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for background elements
      gsap.to(".floating-1", {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".floating-2", {
        y: 15,
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });
    }, heroRef);

    // Initial animation for the background image
    gsap.fromTo(
      imgRef.current,
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      }
    );

    // Cleanup function to revert GSAP context
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Background Video/Animation */}
      {/* <HeroBackground /> */}

      {/* BackgroundImage with different view in mobile and desktop behind */}
      <div className="absolute inset-0 z-10 w-full h-full" ref={imgRef}>
        <img
          src="./Images/Bg-img.png"
          alt="Background"
          className="
    w-full h-full
    object-contain
    sm:object-cover
  "
        />
      </div>

      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="floating-1 absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          style={{ top: "10%", right: "15%" }}
        />
        <motion.div
          className="floating-2 absolute w-64 h-64 bg-orange-500/5 rounded-full blur-2xl"
          style={{ bottom: "20%", left: "10%" }}
        />
      </div> */}
    </section>
  );
};

export default Hero;
