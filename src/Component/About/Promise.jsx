import React from 'react';

export default function Promise({ scene5Ref }) {
  return (
    <section ref={scene5Ref} className="story-scene bg-gradient-to-bl from-orange-900 via-black to-gray-900 text-white">
      <div
        className="background-visual"
        style={{ backgroundImage: ``, opacity: 0.2 }}
      ></div>
      <div className="content-wrapper">
        <p className="text-2xl md:text-3xl mb-4 final-reveal text-gray-300">We are Symbionic.</p>
        <h2 className="text-5xl md:text-7xl font-extrabold mb-10 impact-statement final-reveal drop-shadow-lg leading-tight">
          Not just building limbs — we're rebuilding lives.
        </h2>
        <a
          href="#" // Replace with your actual contact or journey page link
          className="cta-button inline-block bg-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Join Our Journey
        </a>
      </div>
    </section>
  );
}
