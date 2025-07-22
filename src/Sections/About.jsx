import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../Styles/About.css"; // Import your CSS styles for the About section
import Hero from "../Component/About/Hero";
import Spark from "../Component/About/Spark";
import Genesis from "../Component/About/Genesis";
import Solution from "../Component/About/Solution";
import Mission from "../Component/About/Mission";
import Promise from "../Component/About/Promise";
import Footer from "../Component/About/Footer";
import Page from "../Component/3d/Page";
import Spline from "@splinetool/react-spline";
import ImageTransitionComponent from "../Component/3d/ImageTransitionComponent";
import SolutionHero from "../Component/About/SolutionHero";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Main App component
export default function About() {
  const main = useRef();
  // Refs for each section to target with GSAP
  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);
  const scene4Ref = useRef(null);
  const scene5Ref = useRef(null);

  useEffect(() => {
    // Create a GSAP context for better cleanup
    const ctx = gsap.context(() => {
      // --- Scene 1: The Spark - The Conversation ---
      gsap.fromTo(
        scene1Ref.current.querySelector(".background-visual"),
        { filter: "blur(8px)", scale: 1.05 },
        {
          filter: "blur(0px)",
          scale: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: scene1Ref.current,
            start: "top bottom", // Start when top of trigger hits bottom of viewport
            end: "center center", // End when center of trigger hits center of viewport
            scrub: true, // Smoothly animate based on scroll position
          },
        }
      );

      gsap.from(scene1Ref.current.querySelectorAll(".intro-fade"), {
        opacity: 0,
        y: 20,
        stagger: 0.3, // Animate elements one after another
        ease: "power2.out",
        scrollTrigger: {
          trigger: scene1Ref.current,
          start: "top 80%",
          toggleActions: "play none none none", // Play animation once when entering viewport
        },
      });

      gsap.from(scene1Ref.current.querySelector(".quote-fade"), {
        opacity: 0,
        y: 30,
        delay: 0.5, // Delay after intro text
        ease: "power2.out",
        scrollTrigger: {
          trigger: scene1Ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // --- Scene 2: The Genesis - Symbionic's Birth ---
      gsap.from(scene2Ref.current.querySelectorAll(".symbionic-reveal"), {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(scene2Ref.current.querySelector(".brand-name-animation"), {
        opacity: 0,
        scale: 0.8,
        y: 50,
        delay: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // --- Scene 3: The Solution - Krea Adaptive ---
      gsap.from(scene3Ref.current.querySelector(".krea-image-parallax"), {
        yPercent: -10, // Move background up slower than scroll
        ease: "none",
        scrollTrigger: {
          trigger: scene3Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(scene3Ref.current.querySelectorAll(".krea-fade-in"), {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scene3Ref.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(scene3Ref.current.querySelectorAll(".bullet-point-animation"), {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        delay: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: scene3Ref.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // --- Scene 4: The Mission & Impact ---
      gsap.from(scene4Ref.current.querySelectorAll(".mission-reveal"), {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scene4Ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(scene4Ref.current.querySelector(".highlight-mission"), {
        opacity: 0,
        scale: 0.9,
        delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: scene4Ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Scene 5 animations are handled within the Promise component itself
      // to avoid conflicts and ensure proper timing
    }, main); // <- use main as the scope!

    // Cleanup function for GSAP context
    return () => ctx.revert();
  }, []);

  return (
    <div ref={main} className="font-inter antialiased text-gray-200 bg-black">
      <Hero />
      <Spark scene1Ref={scene1Ref} />
      <Genesis scene2Ref={scene2Ref} />
      <SolutionHero />
      <Solution scene3Ref={scene3Ref} />
      <Mission scene4Ref={scene4Ref} />
      <Promise scene5Ref={scene5Ref} />
      {/* <Footer /> */}
      {/* <Page/> */}

      {/* reactiveOrd
      <Spline scene="https://prod.spline.design/wgNZtlezKVl-NjcT/scene.splinecode" /> */}
    </div>
  );
}
