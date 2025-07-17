
import React, { useState } from 'react';
import './App.css';
import SmoothScroll from './Component/SmoothScroll';
import LoadingScreen from './Component/LoadingScreen';
import Hero from './Sections/Hero';
import Navbar from './Component/Navbar';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Navbar />
          <SmoothScroll />
          <Hero />
          <section id="about">About Section</section>
          <section id="mission">Mission Section</section>
          <section id="product">Product Section</section>
          <section id="contact">Contact Section</section>
        </>
      )}
    </>
  );
}

export default App;
