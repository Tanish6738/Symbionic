import React from 'react';
import './FluidText.css';

const FluidText = ({ text = "Kemi" }) => {
  return (
    <section className="fluid-section">
      <div className="content">
        <h2 className="stroke">{text}</h2>
        <h2 className="fill">{text}</h2>
      </div>
    </section>
  );
};

export default FluidText;
