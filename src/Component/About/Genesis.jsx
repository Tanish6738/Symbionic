import React from 'react';

export default function Genesis({ scene2Ref }) {
  return (
    <section ref={scene2Ref} className="story-scene bg-gradient-to-tr from-orange-900 via-black to-gray-900 text-white">
      <div className="content-wrapper">
        <p className="text-xl md:text-2xl mb-4 symbionic-reveal text-gray-300">That single moment sparked what would become</p>
        <h2 className="text-5xl md:text-7xl font-extrabold mb-8 brand-name-animation text-orange-500 drop-shadow-md">Symbionic</h2>
        <p className="text-xl md:text-2xl mb-4 symbionic-reveal text-gray-300">We weren’t just looking to build a prosthetic arm.</p>
        <p className="text-xl md:text-2xl symbionic-reveal text-gray-300">We set out to restore <strong className="text-orange-400">freedom</strong> — the freedom to move, to live, to work, to explore without limits.</p>
      </div>
    </section>
  );
}
