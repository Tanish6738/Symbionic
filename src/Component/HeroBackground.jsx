import React, { useRef, useEffect } from 'react';

function HeroBackground() {
  const videoRef = useRef(null);
  const startTime = 0.1; // Start time in seconds
  const endTime = 16;    // End time in seconds

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleTimeUpdate = () => {
      // If the current time is beyond the end time, reset to start time
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        video.play(); // Ensure it continues playing after reset
      }
    };

    const handleLoadedMetadata = () => {
      // Set initial playback position after metadata is loaded
      video.currentTime = startTime;
      video.play(); // Start playing from the defined start time
    };

    // Add event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Clean up event listeners on component unmount
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline // Important for mobile autoplay
        className="w-full h-full object-cover opacity-20"
        src="/Videos/Bg.mp4" // Remove the #t fragment here
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/20 to-transparent" />
    </div>
  );
}

export default HeroBackground;