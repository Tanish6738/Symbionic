import React from 'react';

export default function Mission({ scene4Ref }) {
  return (
    <section ref={scene4Ref} className="story-scene bg-gradient-to-tl from-orange-900 via-black to-gray-900 text-white">
      <div
        className="background-visual"
        style={{ backgroundImage: ``, opacity: 0.15 }}
      ></div>
      <div className="content-wrapper">
        <p className="text-xl md:text-2xl mb-4 mission-reveal text-gray-300">We launched in India with a mission:</p>
        <h3 className="text-4xl md:text-5xl font-extrabold mb-8 highlight-mission text-orange-500 drop-shadow-md">
          Make world-class prosthetics accessible, dignified, and empowering for every amputee.
        </h3>
        <p className="text-xl md:text-2xl mission-reveal text-gray-300">
          Since then, we’ve helped individuals from all walks of life regain control of their stories — and write bold new chapters.
        </p>
      </div>
    </section>
  );
}
