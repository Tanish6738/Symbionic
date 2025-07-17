import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react'; // Import icons for hamburger menu
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from('.navbar-logo, .nav-item, .navbar-cta', {
        duration: 1,
        opacity: 0,
        y: -50,
        stagger: 0.2,
        ease: 'power3.out',
      });
    },
    { scope: container }
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu on navigation
    }
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'mission', label: 'Mission' },
    { id: 'product', label: 'Product' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} ref={container}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-text">Symbionic</span>
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id} className="nav-item">
              <button
                onClick={() => scrollToSection(link.id)}
                className={`nav-link ${
                  activeSection === link.id ? 'active' : ''
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="navbar-cta">
          <button className="cta-button">Get Started</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;