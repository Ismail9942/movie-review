import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthorContext";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";
import Aos from "aos";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { userLogin, setUser, setIsLoading, googleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value.trim();

    if (!email || !password) {
      Swal.fire({
        title: "Error!",
        text: "Provide Your Email and Password",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const user = await userLogin(email, password);

      if (user) {
        setUser(user);

        Swal.fire({
          title: "Good job!",
          text: "User Login Successful",
          icon: "success",
        });

        location.state ? navigate(location.state) : navigate("/");
      } else {
        throw new Error("User login failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const forgetPassword = async () => {
    setIsLoading(true);
    const email = emailRef.current?.value;
    if (!email) {
      Swal.fire({
        title: "Error!",
        text: "Please provide a valid email",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Password reset email sent. Check your inbox!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  // <---------------GOOGLE SIGNIN------------>

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      location.state ? navigate(location.state) : navigate("/");
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: error.message,
        title: "Something error, Try again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      data-aos="flip-left"
      className="hero bg-linear-to-t from-[#1f5b47] to-[#102043] min-h-screen"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card w-md p-4 border-2 border-[#385962]">
          <h1 className="text-2xl font-bold text-center">Login Now!</h1>
          <form onSubmit={handleLoginSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label  text-white">Email</label>
              <input
                ref={emailRef}
                name="email"
                type="email"
                placeholder="Email"
                className="input w-full text-black"
                required
              />
              <div className="relative">
                <label className="fieldset-label  text-white">Password</label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input w-full text-black"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 top-5 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <div onClick={forgetPassword}>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login Now!</button>

              <div className="mt-1 ">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
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

              <div className="my-3">
                <span>Don't have an account</span>
                <Link
                  to="/auth/register"
                  className="underline text-violet-400 ml-2"
                >
                  Sign up
                </Link>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
