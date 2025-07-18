// AuthPage.jsx
import React, { useState } from "react";
import "../Styles/AuthPage.css";
import { Link } from "react-router-dom";
const AuthPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      {/* Back to Home Button Link */}
      <Link to="/" className="absolute top-4 left-4 text-white z-30 border border-2 p-2 rounded-lg hover:text-orange-400 hover:bg-white">Back to Home</Link>

      {/* Forms Container */}
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </form>

          {/* Sign Up Form */}
          <form className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Sign Up" className="btn solid" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        {/* Left Panel */}
        <div className="panel left-panel">
          <div className="content text-white text-center">
            <h3 className="text-xl font-semibold">New here?</h3>
            <p className="text-sm mt-2 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Optio minus natus est.
            </p>
            <button
              className="btn transparent"
                type="button"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="panel right-panel">
          <div className="content text-white text-center">
            <h3 className="text-xl font-semibold">One of us?</h3>
            <p className="text-sm mt-2 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Optio minus natus est.
            </p>
            <button
              className="btn transparent"
              type="button"
              onClick={() => setIsSignUpMode(false)}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
