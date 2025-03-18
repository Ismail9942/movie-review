import Aos from "aos";
import React, { useEffect } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const MovieCard = ({ movie }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 100,
      once: true,
    });
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div
      data-aos="fade-up"
      key={movie._id}
      className="card w-full h-[500px]  mx-auto shadow-sm shadow-white"
    >
      <figure className="w-full flex-3/4 ">
        <img
          className="w-full h-full object-center"
          src={movie?.poster}
          alt={movie?.title}
        />
      </figure>
      <div className="card-body flex-1/4">
        <h2 className="card-title">Title : {movie?.title}</h2>
        <p>Genre : {movie?.genre}</p>
        <div className="flex gap-2">
          {" "}
          Rating :
          <span className="flex gap-1"> {renderStars(movie.rating)}</span>
          {movie?.rating}
        </div>
        <p>Year : {movie?.releaseYear}</p>
        <p>Duration : {movie?.duration}</p>
        <div className="card-actions justify-end">
          <NavLink
            to={`/movieDetails/${movie._id}`}
            className="btn w-full flex items-center justify-center rounded-none bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 "
          >
            <FaEye />
            See Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
