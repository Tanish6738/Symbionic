import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const contactStyles = {
    container: {
      backgroundColor: "#000000",
      color: "#ffffff",
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "inherit",
    },
    wrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%",
    },
    flexContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "4rem",
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
    leftSection: {
      flex: "1 1 400px",
      minWidth: "300px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    },
    rightSection: {
      flex: "1 1 400px",
      minWidth: "300px",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      lineHeight: "1.2",
    },
    subheading: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    description: {
      color: "#9ca3af",
      lineHeight: "1.6",
      marginBottom: "1.5rem",
    },
    contactInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    contactItem: {
      color: "#ffffff",
    },
    link: {
      color: "#f97316",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    phoneNumber: {
      color: "#f97316",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    socialIcons: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    socialIcon: {
      color: "#ffffff",
      transition: "color 0.3s ease",
      cursor: "pointer",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#d1d5db",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      backgroundColor: "#374151",
      border: "1px solid #4b5563",
      borderRadius: "0.375rem",
      padding: "0.5rem 0.75rem",
      color: "#ffffff",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
    textarea: {
      width: "100%",
      backgroundColor: "#374151",
      border: "1px solid #4b5563",
      borderRadius: "0.375rem",
      padding: "0.5rem 0.75rem",
      color: "#ffffff",
      fontSize: "1rem",
      outline: "none",
      resize: "vertical",
      minHeight: "100px",
      fontFamily: "inherit",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
    button: {
      width: "100%",
      backgroundColor: "#f97316",
      color: "#ffffff",
      fontWeight: "bold",
      padding: "0.75rem 1rem",
      borderRadius: "0.375rem",
      border: "none",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#f97316";
    e.target.style.boxShadow = "0 0 0 3px rgba(249, 115, 22, 0.1)";
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#4b5563";
    e.target.style.boxShadow = "none";
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = "#ea580c";
    e.target.style.transform = "translateY(-2px)";
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = "#f97316";
    e.target.style.transform = "translateY(0)";
  };

  const handleSocialHover = (e) => {
    e.target.style.color = "#f97316";
  };

  const handleSocialLeave = (e) => {
    e.target.style.color = "#ffffff";
  };

  const handleLinkHover = (e) => {
    e.target.style.textDecoration = "underline";
  };

  const handleLinkLeave = (e) => {
    e.target.style.textDecoration = "none";
  };

  return (
    <div style={contactStyles.container}>
      <div style={contactStyles.wrapper}>
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <span
            className="text-orange-500"
          >Contact</span>
          Us
        </h1>
        <div style={contactStyles.flexContainer}>
          {/* Left Section */}
          <div style={contactStyles.leftSection}>
            <div>
              <h2 style={contactStyles.heading}>Get in Touch</h2>
              <p style={contactStyles.description}>
                Have a project in mind? Want to collaborate? Or just want to say
                hi?
                <br />
                Fill in the form and I will get back to you shortly.
              </p>
            </div>

            <div style={contactStyles.contactInfo}>
              <p style={contactStyles.contactItem}>
                Tel:{" "}
                <a
                  href="tel:+917418881800"
                  style={contactStyles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  +91 7418881800
                </a>
              </p>
              <p style={contactStyles.contactItem}>
                Email:{" "}
                <a
                  href="mailto:info@symbionic.co"
                  style={contactStyles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  info@symbionic.co
                </a>
              </p>
              <p style={contactStyles.contactItem}>
                Address: 175, Ranga Gardens, Vadaperumbakkam, Chennai
              </p>
            </div>

            <div>
              <h3 style={contactStyles.subheading}>Let's Chat!</h3>
              <p style={contactStyles.phoneNumber}>+91 7418881800</p>
            </div>

            <div>
              <h3 style={contactStyles.subheading}>Follow us on:</h3>
              <div style={contactStyles.socialIcons}>
                <a
                  href="#"
                  style={contactStyles.socialIcon}
                  onMouseEnter={handleSocialHover}
                  onMouseLeave={handleSocialLeave}
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="#"
                  style={contactStyles.socialIcon}
                  onMouseEnter={handleSocialHover}
                  onMouseLeave={handleSocialLeave}
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="#"
                  style={contactStyles.socialIcon}
                  onMouseEnter={handleSocialHover}
                  onMouseLeave={handleSocialLeave}
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="#"
                  style={contactStyles.socialIcon}
                  onMouseEnter={handleSocialHover}
                  onMouseLeave={handleSocialLeave}
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div style={contactStyles.rightSection}>
            <form style={contactStyles.form}>
              <div style={contactStyles.formGroup}>
                <label htmlFor="contact-name" style={contactStyles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  style={contactStyles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div style={contactStyles.formGroup}>
                <label htmlFor="contact-email" style={contactStyles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  style={contactStyles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div style={contactStyles.formGroup}>
                <label htmlFor="contact-message" style={contactStyles.label}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  style={contactStyles.textarea}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div>
                <button
                  type="submit"
                  style={contactStyles.button}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
