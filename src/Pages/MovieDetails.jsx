import React, { useContext } from "react";
import { FaEdit, FaHeart } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthorContext";

const MovieDetails = () => {
  const movie = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { poster, title, genre, rating, duration, releaseYear, summary, _id } =
    movie;

  const handleFavorite = () => {
    if (!user?.email) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to add favorites!",
        icon: "warning",
      });
      return;
    }

    const favoriteMovie = { ...movie, userEmail: user.email };
    fetch(`http://localhost:5000/favoriteMovies`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(favoriteMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Movie added to favorites successfully!",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);

        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

  const handleDelete = (_id) => {
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
        fetch(`https://movie-review-tau-three.vercel.app/movies/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Movie has been deleted successfully.",
                icon: "success",
              });
              navigate("/allMovies");
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
    <>
      <h3 className="text-center mt-6">
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-4xl">
          <Typewriter
            words={["Movie Details_"]}
            loop={Infinity}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={1000}
          />
        </span>
      </h3>
      <p className="w-[90%] md:w-[55%] text-center mx-auto my-4">
        Inception is a mind-bending sci-fi movie about a skilled thief who
        enters dreams to steal secrets but faces a challenging mission to plant
        an idea instead.
      </p>
      <div className="flex-grow border-t border-dashed border-gray-300 my-6 w-[90%] mx-auto"></div>

      {
        <div className="card gap-6 lg:card-side  shadow-sm m-6 p-6">
          <img
            className="h-[500px] object-contain rounded-lg"
            src={poster}
            alt={title}
          />

          <div className="card-body flex-1 ">
            <h2 className="card-title text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg">
              <span className="font-semibold">Genre:</span> {genre}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Rating:</span> {rating}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Duration:</span> {duration}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Release Year:</span> {releaseYear}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Summary:</span> {summary}
            </p>
            <div className="card-actions flex-col gap-4 justify-evenly mt-6">
              <Link
                onClick={handleFavorite}
                className="btn rounded-lg w-[33%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-none hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500"
              >
                <FaHeart className="text-red-700" /> Add To Favorite
              </Link>
              <Link
                to={`/updateMovie/${_id}`}
                className="btn rounded-lg w-[33%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-none hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500"
              >
                <FaEdit className="text-red-700" /> Update Movie
              </Link>
              <button
                onClick={() => handleDelete(_id)}
                className="btn rounded-lg w-[33%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-none hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500"
              >
                <FaTrashCan className="text-red-700" /> Delete Movie
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default MovieDetails;
