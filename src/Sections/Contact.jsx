import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-400">
                Have a project in mind? Want to collaborate? Or just want to say hi? <br />
                Fill in the form and I will get back to you shortly.
              </p>
            </div>
            <div className="space-y-4">
              <p>Tel: <a href="tel:+917418881800" className="text-orange-500 hover:underline">+91 7418881800</a></p>
              <p>Email: <a href="mailto:info@symbionic.co" className="text-orange-500 hover:underline">info@symbionic.co</a></p>
              <p>Address: 175, Ranga Gardens, Vadaperumbakkam, Chennai</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Chat!</h3>
              <p className="text-orange-500 text-xl font-bold">+91 7418881800</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Follow us on:</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-orange-500"><FaFacebook size={24} /></a>
                <a href="#" className="text-white hover:text-orange-500"><FaTwitter size={24} /></a>
                <a href="#" className="text-white hover:text-orange-500"><FaInstagram size={24} /></a>
                <a href="#" className="text-white hover:text-orange-500"><FaLinkedin size={24} /></a>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea id="message" name="message" rows="4" className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
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


