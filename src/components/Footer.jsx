import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaHeart,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

// import gamerLogo from "../assets/gamer3.png";

const Footer = () => {
  return (
    <footer className="relative bg-black">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
          <div className="space-y-4">
            <div className="flex justify-start items-center">
              <h3 className="font_header text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                🎬 Movie Review
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              This is the place for movie lovers! Find authentic reviews,
              explore the latest blockbusters, and create your own watchlist.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "All Reviews", "Login"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm hover:text-black transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-white" />
                <span className="text-sm">Gzipur, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-white" />
                <span className="text-sm">+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-white" />
                <span className="text-sm">info@chillgamer.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-sm">
              Subscribe to get special offers and updates!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white rounded-l-lg focus:outline-none text-gray-700 w-full"
              />
              <button className="bg-black px-4 py-2 rounded-r-lg transition-colors duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          {[
            { icon: FaGithub, link: "https://github.com/Ismail9942" },
            {
              icon: FaLinkedin,
              link: "https://www.linkedin.com/in/md-mostafizur-rahman-78bb511a4/",
            },
            { icon: FaTwitter, link: "https://x.com/home" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              className="transform hover:scale-110 transition-transform duration-300 text-gray-200  hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white flex items-center justify-center gap-1">
            Made with <FaHeart className="text-red-500" /> by Movie Review Team
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
