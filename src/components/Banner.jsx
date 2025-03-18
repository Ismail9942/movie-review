import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/movie.json")
      .then((res) => res.json())
      .then((data) => {
        const newData = [...data, ...data];
        setMovies(newData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loding.....</div>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      loop={true}
      slidesPerView={1}
      slidesPerGroup={1}
      className="w-full h-[500px] object-cover"
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index} className="relative">
          <img
            src={movie?.poster}
            alt={movie?.title}
            className="w-full min-h-screen object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-10 text-white">
            <h1 className="text-4xl font-bold"></h1>
            <h3 className="text-center">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-4xl">
                <Typewriter
                  words={[`${movie?.title}_`]}
                  loop={Infinity}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={100}
                  delaySpeed={1000}
                />
              </span>
            </h3>
            <p className="text-lg">
              Written and Directed by {movie.director} / {movie.country}{" "}
              {movie.year}
            </p>
            <p className="text-lg font-semibold mt-2">
              In Theater: {movie?.release}
            </p>
            <button className="mt-4  px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition">
              Get Movie
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
