import Aos from "aos";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState("");
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setSuccess("Please fill in all fields.");
      return;
    }
    setSuccess("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div
      data-aos="zoom-in"
      className="w-full mx-auto p-6 my-8 rounded-sm shadow-lg shadow-amber-50 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Image Section */}
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkZQZmlGhg_vBw5G0tOIhCIg4pG3rGBzRMDau78pOtz5MSdGOZTl9h_ncm9xRvgR6jlg&usqp=CAU"
          alt="Contact Us"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Contact Form Section */}
      <div>
        <h3 className="text-center mt-6">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-4xl">
            <Typewriter
              words={["Contact Me _"]}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={1000}
            />
          </span>
        </h3>
        <p className="text-center mb-8">
          Have any questions or feedback about movies? Reach out to us through
          our contact form—we're here to help
        </p>
        {success && (
          <p className="text-green-400 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border  bg-amber-50 text-gray-900 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-amber-50 text-gray-900"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-amber-50 text-gray-900"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-amber-50 text-gray-900"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full p-2 bg-red-600 hover:bg-red-700 rounded text-white font-bold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
