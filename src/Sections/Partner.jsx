import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ChainVisual, ExplodingTorus, NebulaBloomSphere, VerticalSpiral } from "../Component/3d/Element";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Partner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const partnersRef = useRef(null);
  const ctaRef = useRef(null);

  // Partner data
  const partnersData = [
    {
      id: 1,
      name: "Mudhal Partners",
      acronym: "MP",
      description: "Strategic investment partner focused on early-stage biotechnology ventures and innovative healthcare solutions.",
      details: "Mudhal Partners is a leading venture capital firm specializing in biotechnology investments. They provide not just funding but strategic guidance to help biotech startups scale and reach their full potential.",
      focus: ["Biotech Investments", "Strategic Guidance", "Market Expansion"],
      color: "white",
      bgColor: "bg-white/10",
      borderColor: "border-white/20",
      hoverBg: "hover:bg-white/20"
    },
    {
      id: 2,
      name: "StartUp TN",
      acronym: "STN",
      description: "Tamil Nadu's premier startup ecosystem enabler, fostering innovation and entrepreneurship across the state.",
      details: "StartUp TN is the nodal agency for startup ecosystem development in Tamil Nadu. They provide comprehensive support including funding, mentorship, and policy advocacy for emerging startups.",
      focus: ["Ecosystem Development", "Policy Support", "Funding Facilitation"],
      color: "orange-400",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
      hoverBg: "hover:bg-orange-500/30"
    },
    {
      id: 3,
      name: "VIT University",
      acronym: "VIT",
      description: "Leading educational institution driving research and innovation in biotechnology and engineering disciplines.",
      details: "VIT University is a premier institution known for its cutting-edge research facilities and strong industry partnerships. They provide academic excellence and research support for biotechnology innovations.",
      focus: ["Research & Development", "Academic Excellence", "Industry Collaboration"],
      color: "blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      hoverBg: "hover:bg-blue-500/30"
    },
    {
      id: 4,
      name: "AssisTECH Foundation",
      acronym: "ATF",
      description: "Technology foundation dedicated to advancing assistive technologies and inclusive innovation solutions.",
      details: "AssisTECH Foundation focuses on developing technology solutions that improve accessibility and quality of life. They support innovations that bridge the gap between technology and human needs.",
      focus: ["Assistive Technology", "Inclusive Design", "Social Impact"],
      color: "green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      hoverBg: "hover:bg-green-500/30"
    },
    {
      id: 5,
      name: "BIRAC",
      acronym: "BIRAC",
      description: "Biotechnology Industry Research Assistance Council - Government of India's biotech industry development arm.",
      details: "BIRAC is a not-for-profit Section 8, Schedule B, Public Sector Enterprise, set up by Department of Biotechnology (DBT), Government of India as an Industry-Academia Interface.",
      focus: ["Industry Development", "Research Funding", "Innovation Ecosystem"],
      color: "purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
      hoverBg: "hover:bg-purple-500/30"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Description animation
      gsap.fromTo(descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Partner cards staggered animation
      gsap.fromTo(".partner-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: partnersRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openModal = (partner) => {
    setSelectedPartner(partner);
    // Store original overflow and prevent scrolling more safely
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  };

  const closeModal = () => {
    setSelectedPartner(null);
    // Restore original overflow
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-black relative w-full overflow-x-hidden">
      {/* 3D Background - positioned behind everything */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.5}
            color="#4299E1"
          />
          <React.Suspense fallback={null}>
            {!isMobile && (
              <>
                <NebulaBloomSphere position={[0, 0, 0]} turns={5} color="#222" />
                
              </>
            )}
            
            <Environment preset="studio" />
          </React.Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>
      
      {/* Content - positioned in front of 3D background */}
      <div className="relative z-10 w-full">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-white pt-20 mb-16">
            <span className="text-orange-500 underline">Partner</span> with Us
          </h1>
          
          {/* Partners Section */}
          <div className="max-w-6xl mx-auto">
            <p ref={descriptionRef} className="text-base sm:text-lg md:text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              We collaborate with leading organizations and institutions to drive innovation 
              and create breakthrough solutions in biotechnology and healthcare.
            </p>
            
            {/* Partner Grid */}
            <div ref={partnersRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center justify-items-center">
              {partnersData.map((partner) => (
                <div 
                  key={partner.id}
                  className="partner-card group cursor-pointer transition-transform duration-300 hover:scale-105 w-full max-w-xs"
                  onClick={() => openModal(partner)}
                >
                  <div className={`${partner.bgColor} backdrop-blur-sm border ${partner.borderColor} rounded-2xl p-4 sm:p-6 md:p-8 ${partner.hoverBg} transition-all duration-300 w-full`}>
                    <div className="text-white text-center">
                      <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-${partner.color}`}>{partner.acronym}</div>
                      <div className="text-xs sm:text-sm opacity-80 break-words">{partner.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div ref={ctaRef} className="mt-16 text-center">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 sm:px-8 py-3 sm:py-4">
                <span className="text-white font-medium text-sm sm:text-base">Join our ecosystem of innovation</span>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse flex-shrink-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPartner && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className={`${selectedPartner.bgColor} backdrop-blur-sm border ${selectedPartner.borderColor} rounded-xl p-3 flex-shrink-0`}>
                  <div className={`text-2xl font-bold text-${selectedPartner.color}`}>
                    {selectedPartner.acronym}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-words">{selectedPartner.name}</h2>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full flex-shrink-0 ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed break-words">
                {selectedPartner.description}
              </p>
              
              <div className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">About</h3>
                <p className="text-gray-300 leading-relaxed break-words">
                  {selectedPartner.details}
                </p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Key Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.focus.map((area, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 ${selectedPartner.bgColor} border ${selectedPartner.borderColor} rounded-full text-sm text-white break-words`}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partner;
