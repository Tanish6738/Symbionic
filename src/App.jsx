
import React, { useState } from 'react';
import './App.css';
import SmoothScroll from './Component/SmoothScroll';
import LoadingScreen from './Component/LoadingScreen';
import Hero from './Sections/Hero';
import About from './Sections/About';
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
          <About />
          {/* Add other sections/components here as needed */}
        </>
      )}
    </>
  );
}

export default App;
