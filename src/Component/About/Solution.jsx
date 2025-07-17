import React, { useState, useRef } from 'react';

export default function Solution({ scene3Ref }) {
  const [activePanel, setActivePanel] = useState(0);
  const videoRefs = useRef([]);

  const accordionData = [
    {
      title: "Daily Activities",
      subtitle: "Ride to work with confidence",
      description: "Experience seamless integration with your daily routine. Our adaptive prosthetic arm enables you to navigate your commute, handle work tasks, and maintain your active lifestyle without limitations.",
      video: "/Videos/Symbionic.mp4",
      img: "/Images/1.avif",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Recreation & Sports",
      subtitle: "Swim with friends, live fully",
      description: "Don't let limitations define your recreational activities. With waterproof design and adaptive grip technology, enjoy swimming, sports, and outdoor adventures with complete freedom.",
      video: "/Videos/Bg.mp4",
      img: "/Images/2.avif",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Fitness & Strength",
      subtitle: "Lift at the gym, build strength",
      description: "Maintain your fitness goals with our robust prosthetic design. Built to withstand intense workouts while providing the grip strength and control you need for effective training.",
      video: "/Videos/Symbionic.mp4",
      img: "/Images/3.avif",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Life Adaptation",
      subtitle: "Krea adapts with you",
      description: "Your life is unique, and so is your prosthetic. Our modular design adapts to your changing needs, ensuring that your prosthetic arm grows with your lifestyle and aspirations.",
      video: "/Videos/Bg.mp4",
      img: "/Images/4.avif",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const handlePanelClick = (index) => {
    setActivePanel(index);
    
    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    
    // Play the selected video
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  return (
    <section ref={scene3Ref} className="solution-accordion-container">
      
      
      <div className="vertical-accordion">
        {accordionData.map((panel, index) => (
          <div
            key={index}
            className={`accordion-panel ${activePanel === index ? 'active' : ''}`}
            onClick={() => handlePanelClick(index)}
          >
            <div className="panel-content">
              <div className="panel-text">
                <div className="title-container">
                  <h3 className="panel-title">
                    <span className="title-text">{panel.title}</span>
                    <div className="title-underline"></div>
                  </h3>
                </div>
                <p className="panel-subtitle">
                  <span className="subtitle-icon">✦</span>
                  {panel.subtitle}
                </p>
                {activePanel === index && (
                  <div className="panel-description-container">
                    <p className="panel-description">{panel.description}</p>
                    <div className="description-accent"></div>
                  </div>
                )}
              </div>
              
              <div className="panel-visual">
                <div className="image-container">
                  <img src={panel.img} alt={panel.title} className="panel-image" />
                  <div className="image-overlay"></div>
                </div>
                <div className={`gradient-overlay bg-gradient-to-r ${panel.color}`}></div>
                <div className="floating-elements">
                  <div className="floating-dot dot-1"></div>
                  <div className="floating-dot dot-2"></div>
                  <div className="floating-dot dot-3"></div>
                </div>
                {activePanel === index && (
                  <div className="panel-number">
                    <span className="number-text">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
