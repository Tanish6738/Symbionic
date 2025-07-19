import React from "react";
import "../Styles/Contact.css";

const Contact = () => {
  const contactMethods = [
    {
      id: "demo",
      icon: "💬",
      title: "Book a Free Demo",
      description: "Experience Krea Adaptive firsthand",
      link: "https://www.symbionic.co/book-demo",
      linkText: "Book Now",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "phone",
      icon: "📞",
      title: "Call Us",
      description: "Speak directly with our experts",
      link: "tel:+917418881800",
      linkText: "+91 7418881800",
      gradient: "from-gray-700 to-gray-800",
    },
    {
      id: "email",
      icon: "📧",
      title: "Email Us",
      description: "Get detailed information and support",
      link: "mailto:info@symbionic.co",
      linkText: "info@symbionic.co",
      gradient: "from-orange-600 to-orange-700",
    },
  ];

  const socialLinks = [
    { name: "Instagram", icon: "📷", url: "#", color: "hover:text-pink-400" },
    { name: "LinkedIn", icon: "💼", url: "#", color: "hover:text-blue-400" },
    { name: "Twitter", icon: "🐦", url: "#", color: "hover:text-blue-300" },
    { name: "Facebook", icon: "📘", url: "#", color: "hover:text-blue-500" },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6 animate-bounce-slow">
            <span className="text-2xl">🔗</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent animate-gradient-x">
            Ready to reclaim movement?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Try Krea Adaptive or speak to a prosthetic expert today.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={method.id}
              className={`
                group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8
                transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-gray-800/60 hover:border-orange-500/50
                cursor-pointer animate-fade-in-up contact-card
              `}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.gradient} 
                  opacity-0 group-hover:opacity-20 transition-opacity duration-700 ease-in-out blur-sm`}
              ></div>
              <div className="relative z-10">
                <div className="contact-icon">{method.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors duration-300 ease-in-out">
                  {method.title}
                </h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300 ease-in-out">
                  {method.description}
                </p>
                <a
                  href={method.link}
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${method.gradient}
                    text-white font-semibold rounded-xl
                    transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-orange-500/25
                    transform hover:-translate-y-1 group-hover:scale-105`}
                >
                  {method.linkText}
                  <span className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: "800ms" }}>
          <h3 className="text-2xl font-bold mb-8 text-gray-200">📲 Follow Us</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                className={`group flex items-center space-x-3 px-6 py-3 bg-gray-900/60 border border-gray-700 rounded-xl
                  transition-all duration-300 hover:bg-gray-800 hover:border-orange-500/50 hover:scale-105
                  hover:shadow-lg hover:shadow-orange-500/20 ${social.color}`}
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {social.icon}
                </span>
                <span className="font-medium transition-colors duration-300">
                  {social.name}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 opacity-0 group-hover:opacity-100">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "1200ms" }}>
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 cursor-pointer">
            <span className="mr-3 text-xl animate-pulse">🚀</span>
            Start Your Journey Today
            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
