import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const words = ['Adapting...', 'Empowering...', 'Advancing...'];

  useEffect(() => {
    let typeTimeout;
    let eraseTimeout;
    let nextWordTimeout;

    const typeWord = () => {
      const currentWord = words[currentWordIndex];
      let charIndex = 0;

      const typeChar = () => {
        if (charIndex < currentWord.length) {
          setDisplayText(currentWord.substring(0, charIndex + 1));
          charIndex++;
          typeTimeout = setTimeout(typeChar, 80);
        } else {
          setIsTyping(false);
          // Wait before erasing
          eraseTimeout = setTimeout(() => {
            eraseWord();
          }, 2000);
        }
      };

      typeChar();
    };

    const eraseWord = () => {
      const currentWord = words[currentWordIndex];
      let charIndex = currentWord.length;

      const eraseChar = () => {
        if (charIndex > 0) {
          setDisplayText(currentWord.substring(0, charIndex - 1));
          charIndex--;
          eraseTimeout = setTimeout(eraseChar, 50);
        } else {
          setIsTyping(true);
          // Move to next word
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      };

      eraseChar();
    };

    typeWord();

    return () => {
      clearTimeout(typeTimeout);
      clearTimeout(eraseTimeout);
      clearTimeout(nextWordTimeout);
    };
  }, [currentWordIndex]);

  // Show button after progress bar completes (6 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleGetStarted = () => {
    // Animate out with GSAP
    gsap.to('.loading-screen', {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      }
    });
  };

  return (
    <motion.div
      className="loading-screen fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Main Loading Text */}
      <div className="text-center mb-8">
        <div className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span className="text-orange-500">Symbionic</span>
        </div>
        
        <div className="text-xl md:text-2xl text-gray-300 font-light relative">
          <span>{displayText}</span>
          <span 
            className={`inline-block w-0.5 h-6 bg-orange-500 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

      {/* Progress indicator */}
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-orange-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
        />
      </div>

      {/* Get Started Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="group flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:shadow-lg"
          >
            Get Started
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-orange-500/3 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{ bottom: '20%', right: '15%' }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;