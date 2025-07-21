import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

// Professional theme configuration
const defaultTheme = {
  primary: 'orange',
  secondary: 'slate',
  text: {
    light: 'white',
    dark: 'gray-900',
    muted: 'gray-400'
  },
  background: {
    gradient: {
      from: 'gray-900',
      to: 'black'
    }
  }
};

// Internal Card Component for Stack
const CardRotate = ({ children, onSendToBack, sensitivity }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
};

// Add this hook before the Stack component
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Professional Mobile Card Component
const MobileCard = ({ card, isActive, onClick }) => {
  return (
    <motion.div
      className={`w-full rounded-lg overflow-hidden cursor-pointer ${
        isActive ? 'h-48' : 'h-20'
      } transition-all duration-500 ease-in-out border border-gray-300 shadow-lg hover:shadow-xl`}
      onClick={onClick}
      layout
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10" />
        <img
          src={card.img}
          alt={`card-${card.id}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-white font-semibold text-lg">{card.title}</h3>
          {isActive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-sm mt-2"
            >
              {card.description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Professional Stack Component
const Stack = ({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}) => {
  const [cards, setCards] = useState(cardsData);
  const [activeCard, setActiveCard] = useState(cards[cards.length - 1]);
  const { width } = useWindowSize();
  const isMobile = width < 768; // Define mobile breakpoint

  // Mobile layout
  if (isMobile) {
    return (
      <div className="w-full space-y-6">
        {cards.map((card) => (
          <MobileCard
            key={card.id}
            card={card}
            isActive={activeCard.id === card.id}
            onClick={() => setActiveCard(card)}
          />
        ))}
      </div>
    );
  }

  // Desktop layout with professional styling
  const sendToBack = (id) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      setActiveCard(newCards[newCards.length - 1]);
      return newCards;
    });
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <div className="relative" style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 800,
      }}>
        {cards.map((card, index) => {
          const randomRotate = randomRotation ? Math.random() * 4 - 2 : 0;
          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
            >
              <motion.div
                className="absolute w-full h-full rounded-lg overflow-hidden cursor-grab active:cursor-grabbing shadow-xl border border-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  sendToBackOnClick && sendToBack(card.id);
                }}
                animate={{
                  rotateZ: (cards.length - index - 1) * 3 + randomRotate,
                  scale: 1 + index * 0.03 - cards.length * 0.03,
                  transformOrigin: "90% 90%",
                }}
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
                style={{
                  width: cardDimensions.width,
                  height: cardDimensions.height,
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 z-10" />
                <img
                  src={card.img}
                  alt={`card-${card.id}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                />
              </motion.div>
            </CardRotate>
          );
        })}
      </div>
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={activeCard.id}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-lg bg-gray-900/90 backdrop-blur-sm p-6 border border-gray-700 shadow-xl">
          <h3 className="text-2xl font-semibold text-white mb-4">
            {activeCard.title}
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            {activeCard.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Professional AnimatedTextUnderline Component
const AnimatedTextUnderline = ({ preText, highlightedText, postText, className = "" }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.5, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay: 0.5, duration: 1 }
      }
    }
  };

  return (
    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${className}`}>
      <span className="text-white">{preText}</span>
      <span className="relative whitespace-nowrap text-orange-500">
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 418 42"
          className="absolute left-0 top-2/3 transform -translate-y-1/3"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            variants={draw}
            d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203"
            strokeWidth="3"
            fill="none"
            stroke="#FB923C"
          />
        </motion.svg>
        <span className="relative text-orange-500">{highlightedText}</span>
      </span>
      <span className="text-white">{postText}</span>
    </h1>
  );
};

// Professional Main CustomPage Component
const CustomPage = ({
  theme = defaultTheme,
  title = "Welcome",
  heading = {
    preText: "Discover ",
    highlightedText: "Powerful Tools",
    postText: " for Modern Development"
  },
  description = "Experience the next generation of development tools...",
  features = [],
  highlights = [],
  stackConfig = {
    cardDimensions: {
      width: typeof window !== 'undefined' 
        ? Math.min(window.innerWidth * 0.8, 350)
        : 350,
      height: typeof window !== 'undefined'
        ? Math.min(window.innerWidth * 0.5, 250)
        : 250
    },
    sensitivity: 150,
    randomRotation: true,
    sendToBackOnClick: true,
    animationConfig: { stiffness: 300, damping: 25 }
  }
}) => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  // Professional grid background pattern
  const gridStyle = {
    backgroundImage: `radial-gradient(#374151 1px, transparent 1px)`,
    backgroundSize: '30px 30px',
    opacity: 0.1
  };

  return (
    <div className="relative bg-black min-h-screen">
      {/* Professional grid background */}
      <div className="absolute inset-0" style={gridStyle}></div>
      
      {/* Orange gradient overlays to match Symbionic theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-white/5 to-black opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
      
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-32 pt-12 sm:pt-24 relative z-10">
        <motion.div 
          className="mb-8 sm:mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <AnimatedTextUnderline
            preText={heading.preText}
            highlightedText={heading.highlightedText}
            postText={heading.postText}
            className="!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-12">
          <motion.div 
            className="col-span-1 md:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed md:text-xl">
              {description}
            </p>
            
            <div className="rounded-lg bg-gray-800/50 backdrop-blur-sm p-6 border border-gray-700 shadow-xl">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Platform Highlights
              </h3>
              <ul className="space-y-3 text-base text-gray-300">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-3 text-orange-500 text-lg">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-1 md:col-span-7 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-8 sm:-top-12 right-4 sm:right-8 z-10"
            >
              <div className="bg-orange-500 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <p className="text-white text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                  Interactive Cards
                </p>
              </div>
            </motion.div>

            <div className="w-full flex justify-center px-2 sm:px-4">
              <div className="max-w-[280px] sm:max-w-none w-full">
                <Stack 
                  cardsData={features}
                  {...stackConfig}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Example usage with professional theme
const exampleFeatures = [
  {
    id: 1,
    img: "https://example.com/ai.jpg",
    title: "AI-Powered Solutions",
    description: "Leverage cutting-edge artificial intelligence to transform your business processes with intelligent automation and data-driven insights."
  },
  // ... more features
];

const exampleHighlights = [
  "Enterprise-grade security and compliance",
  "Real-time analytics and reporting",
  "Scalable cloud infrastructure",
  "24/7 professional support"
];

export const ExampleCustomPage = () => (
  <CustomPage
    theme={{
      primary: 'orange',
      secondary: 'gray',
      text: {
        light: 'white',
        dark: 'gray-900',
        muted: 'gray-400'
      },
      background: {
        gradient: {
          from: 'gray-900',
          to: 'black'
        }
      }
    }}
    title="Professional Platform"
    heading={{
      preText: "Build ",
      highlightedText: "Enterprise Solutions",
      postText: " with Confidence"
    }}
    description="Professional-grade platform designed for enterprise needs..."
    features={exampleFeatures}
    highlights={exampleHighlights}
    stackConfig={{
      cardDimensions: { width: 350, height: 250 },
      sensitivity: 120,
      randomRotation: false
    }}
  />
);

export default CustomPage;
