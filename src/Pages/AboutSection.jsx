import Aos from "aos";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const AboutSection = () => {
  const navigate = useNavigate();
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     subject: "",
  //     message: "",
  //   });
  //   const [success, setSuccess] = useState("");
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <div
      data-aos="zoom-in"
      className="w-full mx-auto mb-10 p-6  rounded-lg shadow-lg"
    >
      {/* Section Title */}
      <h3 className="text-center mt-6">
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-4xl">
          <Typewriter
            words={["About US_"]}
            loop={Infinity}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={1000}
          />
        </span>
      </h3>
      <p className="text-center text-gray-400 mb-8">
        We provide secure, valuable, and top-notch support to our customers
        worldwide.
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="p-6 bg-white text-black rounded-lg shadow-md">
          <span className="text-red-500 text-4xl">🛡️</span>
          <h3 className="font-bold text-xl my-2">Data Encrypted</h3>
          <Link to="/article">
            <button
              onClick={handleLearnMore}
              className="bg-black text-white py-2 px-4 rounded"
            >
              Learn More
            </button>
          </Link>
        </div>
        <div className="p-6 bg-white text-black rounded-lg shadow-md">
          <span className="text-red-500 text-4xl">👥</span>
          <h3 className="font-bold text-xl my-2">Clients Helped</h3>
          <Link to="/article">
            <button
              onClick={handleLearnMore}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Learn More
            </button>
          </Link>
        </div>
        <div className="p-6 bg-white text-black rounded-lg shadow-md">
          <span className="text-red-500 text-4xl">💰</span>
          <h3 className="font-bold text-xl my-2">Brilliant Value</h3>
          <Link to="/article">
            <button
              onClick={handleLearnMore}
              className="bg-black text-white py-2 px-4 rounded"
            >
              Learn More
            </button>
          </Link>
        </div>
        <div className="p-6 bg-white text-black rounded-lg shadow-md">
          <span className="text-red-500 text-4xl">🛟</span>
          <h3 className="font-bold text-xl my-2">Great Support</h3>
          <Link to="/article">
            <button
              onClick={handleLearnMore}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center bg-black text-white p-6 mt-8 rounded-lg">
        <div>
          <span className="text-red-500 text-3xl">🎓</span>
          <h3 className="text-2xl font-bold">550+</h3>
          <p>Projects Done</p>
        </div>
        <div>
          <span className="text-red-500 text-3xl">🚛</span>
          <h3 className="text-2xl font-bold">180+</h3>
          <p>Tons of Goods</p>
        </div>
        <div>
          <span className="text-red-500 text-3xl">👨‍💼</span>
          <h3 className="text-2xl font-bold">150+</h3>
          <p>Total Employees</p>
        </div>
        <div>
          <span className="text-red-500 text-3xl">🏆</span>
          <h3 className="text-2xl font-bold">70+</h3>
          <p>Win Awards</p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
