import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import {
  FaClipboardList,
  FaEnvelope,
  FaFilm,
  FaHeart,
  FaHome,
  FaPhone,
} from "react-icons/fa";
import ThemeToggle from "../Auth/ThemeToggle";

const Navber = () => {
  return (
    <nav className="bg-[#21212199] text-white">
      <nav className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content gap-6 bg-base-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <NavLink className="font-bold flex items-center gap-2" to="/">
                <FaHome /> Home
              </NavLink>

              <NavLink
                className="font-bold flex items-center gap-2"
                to="/addMovie"
              >
                <FaFilm /> Add Movie
              </NavLink>

              <NavLink
                className="font-bold flex items-center gap-2"
                to="/allMovies"
              >
                <FaClipboardList /> All Movies
              </NavLink>

              <NavLink
                className="font-bold flex items-center gap-2"
                to="/favoriteMovies"
              >
                <FaHeart /> Favorite Movies
              </NavLink>
              <NavLink
                className="font-bold flex items-center gap-2"
                to="/contactSection"
              >
                <FaPhone /> My Contact
              </NavLink>
              <NavLink
                className="font-bold flex items-center gap-2"
                to="/aboutSection"
              >
                <FaEnvelope /> About Us
              </NavLink>
            </ul>
          </div>

          <a className=" bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold">
            🎬 Movie Review{" "}
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-8 items-center px-1">
            <NavLink className="font-bold flex items-center gap-2" to="/">
              <FaHome /> Home
            </NavLink>

            <NavLink
              className="font-bold flex items-center gap-2"
              to="/addMovie"
            >
              <FaFilm /> Add Movie
            </NavLink>

            <NavLink
              className="font-bold flex items-center gap-2"
              to="/allMovies"
            >
              <FaClipboardList /> All Movies
            </NavLink>

            <NavLink
              className="font-bold flex items-center gap-2"
              to="/favoriteMovies"
            >
              <FaHeart />
              My Favorite Movies
            </NavLink>
            <NavLink
              className="font-bold flex items-center gap-2"
              to="/contactSection"
            >
              <FaPhone /> My Contact
            </NavLink>
            <NavLink
              className="font-bold flex items-center gap-2"
              to="/aboutSection"
            >
              <FaEnvelope />
              About Us
            </NavLink>
          </ul>
        </div>
        <div className="navbar-end gap-8">
          <ThemeToggle />
          <Profile />
        </div>
      </nav>
    </nav>
  );
};

export default Navber;
