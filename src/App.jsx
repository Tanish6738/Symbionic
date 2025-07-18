import React, { useEffect, useState } from "react";
import "./App.css";
import SmoothScroll from "./Component/SmoothScroll";
import LoadingScreen from "./Component/LoadingScreen";
import Hero from "./Sections/Hero";
import About from "./Sections/About";
import Navbar from "./Component/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./Sections/AuthPage";
import Product from "./Sections/Product";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Immediately disable loading screen for the /Login route
    if (location.pathname === "/Login") {
      setIsLoading(false);
    }
  }, [location.pathname]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && location.pathname !== "/Login" ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
        
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <SmoothScroll />
                <Hero />
                <About />
                <Product/>                
              </>
            }
          />
          <Route path="/Login" element={<AuthPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
