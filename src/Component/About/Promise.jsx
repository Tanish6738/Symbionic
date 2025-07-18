import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Promise({ scene5Ref }) {
  const imgRefs = useRef([]);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);

  // Image Scroll Animations
  useLayoutEffect(() => {
    imgRefs.current.forEach((img, i) => {
      if (!img) return;
      const direction = i % 2 === 0 ? 100 : -100;

      gsap.fromTo(
        img,
        {
          opacity: 0,
          y: direction,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  // Text Entrance Animations
  useLayoutEffect(() => {
    if (!scene5Ref.current || !textRef.current || !headingRef.current || !buttonRef.current) {
      console.warn('Promise component: Some refs are not available');
      return;
    }

    console.log('Promise component: Setting up GSAP animations');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene5Ref.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => console.log('Promise: ScrollTrigger entered'),
        onLeave: () => console.log('Promise: ScrollTrigger left'),
        // markers: true, // Uncomment for debugging
      },
    });

    // Set initial states
    gsap.set([textRef.current, headingRef.current, buttonRef.current], {
      opacity: 0,
      y: 40,
    });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => console.log('Promise: Text animation complete'),
    })
      .to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          onComplete: () => console.log('Promise: Heading animation complete'),
        },
        '-=0.4'
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          onComplete: () => console.log('Promise: Button animation complete'),
        },
        '-=0.5'
      );
  }, []);

  // Fallback mechanism to ensure text is visible
  useEffect(() => {
    const timer = setTimeout(() => {
      if (textRef.current && headingRef.current && buttonRef.current) {
        console.log('Promise: Applying fallback visibility');
        [textRef.current, headingRef.current, buttonRef.current].forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0px)';
          el.style.visibility = 'visible';
        });
      }
    }, 3000); // Fallback after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const setImgRef = (el, index) => {
    imgRefs.current[index] = el;
  };

  return (
    <section
      ref={scene5Ref}
      className="story-scene bg-gradient-to-bl from-orange-900 via-black to-gray-900 text-white relative overflow-hidden min-h-screen md:min-h-auto"
    >
      <div
        className="background-visual absolute inset-0 z-0"
        style={{ backgroundImage: ``, opacity: 0.2 }}
      ></div>

      {/* Mobile Layout - Stacked */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Text Content */}
        <div className="content-wrapper z-10 relative px-6 py-12 flex-1 flex flex-col justify-center bg-black/40 backdrop-blur-sm">
          <p
            ref={textRef}
            className="text-xl mb-4 final-reveal text-gray-200 font-medium z-20 relative"
          >
            We are
            <span className="text-orange-500 underline "> Symbionic.</span>
          </p>
          <h2
            ref={headingRef}
            className="text-4xl font-extrabold mb-8 impact-statement final-reveal drop-shadow-2xl leading-tight text-white z-20 relative"
          >
            Not just building limbs — we're rebuilding lives.
          </h2>
          <a
            ref={buttonRef}
            href="#"
            className="cta-button inline-block bg-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transition-transform duration-300 ease-in-out self-start z-20 relative"
          >
            Join Our Journey
          </a>
        </div>

        {/* Mobile Images Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-black/20">
          <img
            ref={(el) => setImgRef(el, 0)}
            src="/Images/Selfi.avif"
            alt="Description 2"
            className="h-40 w-full object-cover rounded-lg shadow-lg"
          />
          <img
            ref={(el) => setImgRef(el, 1)}
            src="/Images/pin.avif"
            alt="Description 1"
            className="h-40 w-full object-cover rounded-lg shadow-lg"
          />
          <img
            ref={(el) => setImgRef(el, 2)}
            src="/Images/lady.jpg"
            alt="Description 3"
            className="h-40 w-full object-cover rounded-lg shadow-lg"
          />
          <img
            ref={(el) => setImgRef(el, 3)}
            src="/Images/flower.jpg"
            alt="Description 4"
            className="h-40 w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Desktop Layout - Original Absolute Positioning */}
      <div className="hidden md:block">
        <div className="content-wrapper z-10 relative px-6 py-16">
          <p
            ref={textRef}
            className="text-2xl md:text-3xl mb-4 final-reveal text-gray-300 z-20 relative"
          >
            We are Symbionic.
          </p>
          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl font-extrabold mb-10 impact-statement final-reveal drop-shadow-lg leading-tight z-20 relative"
          >
            Not just building limbs — we're rebuilding lives.
          </h2>
          <a
            ref={buttonRef}
            href="#"
            className="cta-button inline-block bg-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transition-transform duration-300 ease-in-out z-20 relative"
          >
            Join Our Journey
          </a>
        </div>

        {/* Desktop Images - Absolute Positioning */}
        <div>
          <img
            ref={(el) => setImgRef(el, 0)}
            src="/Images/Selfi.avif"
            alt="Description 2"
            className="h-68 object-cover absolute bottom-0 right-0 m-4 rounded-lg shadow-lg"
          />
          <img
            ref={(el) => setImgRef(el, 1)}
            src="/Images/pin.avif"
            alt="Description 1"
            className="h-68 w-64 object-cover absolute bottom-0 left-0 m-4 rounded-lg shadow-lg"
          />
          <img
            ref={(el) => setImgRef(el, 2)}
            src="/Images/lady.jpg"
            alt="Description 3"
            className="h-68 object-cover absolute top-0 left-0 m-4 rounded-lg shadow-lg"
          />
          <img
            ref={(el) => setImgRef(el, 3)}
            src="/Images/flower.jpg"
            alt="Description 4"
            className="h-68 w-64 object-cover absolute top-0 right-0 m-4 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
