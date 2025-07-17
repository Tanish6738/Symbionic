import React, { useRef, useEffect, useState } from 'react';

export default function Spark({ scene1Ref }) {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setIsVisible(true);
          setHasPlayed(true);
          if (videoRef.current) {
            videoRef.current.play();
          }
          // Delay content animation for better effect
          setTimeout(() => {
            setAnimateContent(true);
          }, 500);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (scene1Ref.current) {
      observer.observe(scene1Ref.current);
    }

    return () => {
      if (scene1Ref.current) {
        observer.unobserve(scene1Ref.current);
      }
    };
  }, [scene1Ref, hasPlayed]);

  return (
    <section ref={scene1Ref} className="relative min-h-screen overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          muted 
          className="w-full h-full object-cover"
          onEnded={() => {
            // Optionally add a subtle fade or transition when video ends
            if (videoRef.current) {
              videoRef.current.style.opacity = '0.8';
            }
          }}
        >
          <source src="/Videos/black.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>
        {/* Subtle animated particles effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Decorative Elements */}
          <div className={`transform transition-all duration-1000 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            </div>
          </div>

          {/* Main Title */}
          <h2 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 transition-all duration-1000 delay-200 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              Our Story
            </span>
          </h2>

          {/* Subtitle */}
          <p className={`text-2xl md:text-3xl lg:text-4xl mb-12 text-gray-300 font-light transition-all duration-1000 delay-400 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            It started with a <span className="text-orange-400 font-medium">conversation</span>.
          </p>

          {/* Quote Container */}
          <div className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-600 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Quote Marks */}
            <div className="absolute -top-6 -left-4 text-6xl text-orange-500/30 font-serif">"</div>
            <div className="absolute -bottom-6 -right-4 text-6xl text-orange-500/30 font-serif">"</div>
            
            {/* Quote Background */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <blockquote className="text-xl md:text-2xl lg:text-3xl italic font-medium leading-relaxed text-white mb-6">
                More than anything, I just want to be able to do the little things — 
                <span className="text-orange-400"> open a door</span>, 
                <span className="text-orange-400"> ride my bike</span>, 
                <span className="text-orange-400"> go to work</span> without feeling like I don't belong.
              </blockquote>
              
              {/* Attribution */}
              <div className="flex items-center justify-center">
                <div className="w-12 h-0.5 bg-orange-500 mr-4"></div>
                <p className="text-lg md:text-xl text-gray-400 font-light">
                  A young man who had lost his arm
                </p>
                <div className="w-12 h-0.5 bg-orange-500 ml-4"></div>
              </div>
            </div>
          </div>

          {/* Call to Action or Navigation Hint */}
          <div className={`mt-16 transition-all duration-1000 delay-800 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-center">
              <div className="animate-bounce">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
