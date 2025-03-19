import Aos from "aos";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthorContext";

const FavoriteMovies = () => {
  const { user } = useContext(AuthContext);
  const [movieFavorite, setMovieFavorite] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/favoriteMovies?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMovieFavorite(data));
  }, [user.email]);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 100,
      once: true,
    });
  }, []);

  const handleFavoriteDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://movie-review-tau-three.vercel.app/favoriteMovies/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete movie");
            }
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Movie has been removed from favorites.",
                icon: "success",
              });
              const remainingMovie = movieFavorite.filter(
                (movie) => movie._id !== _id
              );
              setMovieFavorite(remainingMovie);
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="p-6">
      <div className="text-center my-8">
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-4xl">
          <Typewriter
            words={["My Favorite Movies_"]}
            loop={Infinity}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={1000}
          />
        </span>
      </div>

      {movieFavorite.length > 0 ? (
        <div className="overflow-x-auto md:overflow-hidden">
          <table
            className="w-full table-auto text-center bg-gray-900 rounded-lg shadow-lg"
            data-aos="fade-up"
          >
            <thead>
              <tr className="border-b-2 border-[#A91D3A]" data-aos="fade-up">
                <th className="py-4 px-4 text-white">Movie Cover</th>
                <th className="py-4 px-4 text-white">Movie Title</th>
                <th className="py-4 px-4 text-white">Ratings</th>
                <th className="py-4 px-4 text-white">Year</th>
                <th className="py-4 px-4 text-white">Genre</th>
                <th className="py-4 px-4 text-white">Duration</th>
                <th className="py-4 px-4 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {movieFavorite?.map((favorite) => (
                <tr
                  key={favorite._id}
                  className="transition-all transform duration-300 border-b border-[#fff] hover:text-white hover:bg-[#2d2c2c]"
                  data-aos="fade-up"
                >
                  <td className="px-2 py-4 flex justify-center mx-auto">
                    <img
                      src={favorite?.poster}
                      alt={favorite?.title}
                      className="w-16 h-16  rounded-md"
                    />
                  </td>
                  <td className="py-4 px-4 text-white">{favorite?.title}</td>
                  <td className="py-4 px-4 text-white">{favorite?.rating}</td>
                  <td className="py-4 px-4 text-white">
                    {favorite?.releaseYear}
                  </td>
                  <td className="py-4 px-4 text-white">{favorite?.genre}</td>
                  <td className="py-4 px-4 text-white">{favorite?.duration}</td>
                  <td className="px-2 py-4">
                    <button
                      onClick={() => handleFavoriteDelete(favorite._id)}
                      className="px-4 py-2 bg-[#A91D3A] text-white rounded-md hover:bg-[#9c1631] transition duration-300"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg">
          Your watchlist is currently empty.
        </p>
      )}
    </div>
  );
};

export default FavoriteMovies;
