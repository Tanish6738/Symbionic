import React from "react";
import CustomPage from "../Component/CustomPage";
const AllProducts = () => {
  // Client testimonials data
  const testimonialFeatures = [
    {
      id: 1,
      img: "/Images/1.avif",
      title: "Sarah Johnson",
      description:
        "Symbionic's fitness solution transformed my workout routine completely. The AI-powered analytics helped me achieve my goals 3x faster than traditional methods. The personalized training programs are simply outstanding!",
      role: "Fitness Enthusiast",
      rating: 5,
    },
    {
      id: 2,
      img: "/Images/2.avif",
      title: "Michael Chen",
      description:
        "As a professional swimmer, I needed precise performance tracking. Symbionic's aquatic sports technology provided insights I never knew existed. My technique improved dramatically within weeks.",
      role: "Professional Swimmer",
      rating: 5,
    },
    {
      id: 3,
      img: "/Images/3.avif",
      title: "Emma Rodriguez",
      description:
        "The smart mobility platform revolutionized my daily commute. Intelligent navigation and safety features give me peace of mind. It's like having a personal assistant for transportation.",
      role: "Urban Commuter",
      rating: 5,
    },
    {
      id: 4,
      img: "/Images/4.avif",
      title: "Lisa Thompson",
      description:
        "Symbionic's beauty and wellness solutions are game-changing. The AI-powered skincare analysis was spot-on, and the customized treatments delivered results beyond my expectations.",
      role: "Beauty Blogger",
      rating: 5,
    },
    {
      id: 5,
      img: "/Images/lady.jpg",
      title: "David Park",
      description:
        "Our smart utility management reduced energy costs by 40% in the first month. The automation and monitoring capabilities are incredibly sophisticated yet easy to use.",
      role: "Homeowner",
      rating: 5,
    },
    {
      id: 6,
      img: "/Images/two.jpg",
      title: "Rachel Green",
      description:
        "The IoT connectivity platform seamlessly integrated all our smart devices. Home automation has never been this intuitive and reliable. Truly impressive technology!",
      role: "Tech Professional",
      rating: 5,
    },
  ];

  const testimonialHighlights = [
    "⭐ 98% customer satisfaction rate",
    "🎯 500+ successful implementations",
    "� Trusted by Fortune 500 companies",
    "🌟 Award-winning customer support",
    "📈 Average 40% performance improvement",
    "🔒 100% data security guarantee",
    "� 24/7 technical assistance",
    "🌍 Serving clients in 50+ countries",
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
        title="Customer Testimonials"
        heading={{
          preText: "What Our ",
          highlightedText: "Customers ",
          postText: "Say About Us",
        }}
        description="Discover real stories from satisfied customers who have transformed their experiences with Symbionic's innovative solutions. From fitness enthusiasts to tech professionals, see how our AI-powered products have made a meaningful impact in their lives."
        features={testimonialFeatures}
        highlights={testimonialHighlights}
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

      {/* Additional Testimonial Information Section */}
    </div>
  );
};

export default AllProducts;
