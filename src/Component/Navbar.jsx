import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'; // Import arrow icons
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
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

  const toggleNavbar = () => {
    setIsNavbarHidden(!isNavbarHidden);
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'mission', label: 'Mission' },
    { id: 'product', label: 'Product' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isNavbarHidden ? 'hidden' : ''}`} ref={container}>
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

          {/* Hide Navbar Button */}
          <button
            className="cta-button"
            onClick={toggleNavbar}
            style={{ marginLeft: '10px', padding: '8px 12px' }}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Show Navbar Toggle Button */}
      <button
        className={`navbar-toggle-button ${isNavbarHidden ? 'show' : 'hide'}`}
        onClick={toggleNavbar}
      >
        <ChevronRight size={20} />
      </button>
    </>
  );
};

export default Navbar;