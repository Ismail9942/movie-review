import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthorContext";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Aos from "aos";
import { toast } from "react-toastify";
import auth from "../firebase/firebase.config";

const Register = () => {
  const { setUser, userRegister, googleSignIn } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // -------AOS ANIMATION
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    if (!/[A-Z]/.test(password) && !/[a-z]/.test(password)) {
      setPasswordError("Password must contain an Uppercsse & Lowercase");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      return;
    }

    try {
      const registeredUser = await userRegister(
        formData.email,
        formData.password,
        formData.name,
        formData.photoURL
      );
      setUser(registeredUser);
      if (registeredUser) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Register Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        await auth.currentUser.reload();
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.message, "error");
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success("Successfully signed in with Google!", "success");
      navigate("/");
    } catch (error) {
      toast.error(error.message, "error");
    }
  };

  return (
    <div
      data-aos="flip-left"
      className="w-full md:w-1/2 mx-auto flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8"
    >
      <div
        className="w-full flex flex-col md:flex md:flex-row justify-center items-center gap-4  space-y-8 sm:shadow-custom  p-8  rounded-2xl bg-linear-to-t from-[#1f5b47] to-[#102043]"
        data-aos="fade-up"
      >
        <div className="flex-1">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-white">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <input
                  type="text"
                  required
                  className="appearance-none bg-white rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#A91D3A] focus:border-[#A91D3A] focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  className="appearance-none bg-white rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#A91D3A] focus:border-[#A91D3A] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  type="url"
                  required
                  className="appearance-none bg-white rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#A91D3A] focus:border-[#A91D3A] focus:z-10 sm:text-sm"
                  placeholder="Photo URL"
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none bg-white rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#A91D3A] focus:border-[#A91D3A] focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}

            <div>
              <button
                type="submit"
                className="btn inline-block w-full btn-neutral py-3"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-1 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mt-1 ">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              {/* <FaGoogle className="text-xl" /> */}
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-2 text-center text-sm text-white">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className=" text-violet-400 font-bold underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
