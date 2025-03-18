import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Auth/AuthorContext";

const Profile = () => {
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <div className="flex items-center gap-4">
      {user && user?.email ? (
        <div className="relative group">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />

          <span className="absolute w-34 text-center left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {user.displayName}
          </span>
        </div>
      ) : (
        <FaUserCircle className="text-3xl cursor-pointer" />
      )}
      {user && user?.email ? (
        <button onClick={logOutUser} className="btn btn-neutral rounded-none ">
          Log Out
        </button>
      ) : (
        <NavLink to="/auth/login" className="btn btn-neutral rounded-none">
          Login
        </NavLink>
      )}
    </div>
  );
};

export default Profile;
