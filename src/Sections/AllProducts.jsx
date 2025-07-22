import React from "react";
import CustomPage from "../Component/CustomPage";
const AllProducts = () => {
  // Product showcase data
  const productFeatures = [
    {
      id: 1,
      img: "/Images/GYM.png",
      title: "Fitness & Training",
      description:
        "Revolutionary fitness solutions powered by AI technology. Track your progress, optimize workouts, and achieve your fitness goals with personalized training programs and real-time performance analytics.",
    },
    {
      id: 2,
      img: "/Images/Swim.png",
      title: "Aquatic Sports",
      description:
        "Advanced swimming and water sports technology. Monitor technique, track performance metrics, and improve your aquatic skills with our cutting-edge underwater sensors and motion analysis.",
    },
    {
      id: 3,
      img: "/Images/Ride.png",
      title: "Smart Mobility",
      description:
        "Next-generation transportation solutions. Experience seamless connectivity, intelligent navigation, and enhanced safety features in our revolutionary mobility platform.",
    },
    {
      id: 4,
      img: "/Images/Cosmetic.png",
      title: "Beauty & Wellness",
      description:
        "Personalized beauty and wellness solutions. Discover AI-powered skincare analysis, customized treatment plans, and innovative beauty technologies for optimal self-care.",
    },
    {
      id: 5,
      img: "/Images/Utility.png",
      title: "Smart Utilities",
      description:
        "Intelligent utility management systems. Optimize energy consumption, monitor usage patterns, and reduce costs with our smart home automation and utility control solutions.",
    },
    {
      id: 6,
      img: "/Images/Hook.png",
      title: "IoT Connectivity",
      description:
        "Seamless device integration and connectivity. Connect all your smart devices through our unified platform for enhanced automation and intelligent home management.",
    },
  ];

  const productHighlights = [
    "🚀 Advanced AI-powered product ecosystem",
    "🔗 Seamless cross-platform integration",
    "📊 Real-time analytics and insights",
    "🛡️ Enterprise-grade security protocols",
    "⚡ Lightning-fast performance optimization",
    "🌍 Global cloud infrastructure",
    "🔧 Customizable solutions for every need",
    "📱 Mobile-first responsive design",
  ];

  const stackConfiguration = {
    cardDimensions: {
      width:
        typeof window !== "undefined"
          ? Math.min(window.innerWidth * 0.7, 400)
          : 400,
      height:
        typeof window !== "undefined"
          ? Math.min(window.innerWidth * 0.45, 280)
          : 280,
    },
    sensitivity: 120,
    randomRotation: true,
    sendToBackOnClick: true,
    animationConfig: { stiffness: 280, damping: 22 },
  };

  return (
    <div className="min-h-screen">
      <CustomPage
        title="Symbionic Product Showcase"
        heading={{
          preText: "Explore Our ",
          highlightedText: "Revolutionary Products",
          postText: " & Solutions",
        }}
        description="Discover Symbionic's comprehensive suite of innovative products designed to transform your digital experience. From fitness tracking to smart utilities, our AI-powered solutions integrate seamlessly into your lifestyle, providing intelligent automation and unprecedented convenience."
        features={productFeatures}
        highlights={productHighlights}
        stackConfig={stackConfiguration}
        theme={{
          primary: "orange",
          secondary: "slate",
          text: {
            light: "white",
            dark: "gray-900",
            muted: "gray-400",
          },
          background: {
            gradient: {
              from: "black",
              to: "black",
            },
          },
        }}
      />

      {/* Additional Product Information Section */}
    </div>
  );
};

export default AllProducts;
