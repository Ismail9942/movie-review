import { useLoaderData } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import MovieCard from "../components/MovieCard";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

const AllMovies = () => {
  const movies = useLoaderData();
  const [search, setSearch] = useState("");
  const [movieData, setMovieData] = useState(movies);

  useEffect(() => {
    if (search.trim() === "") {
      setMovieData(movies);
    } else {
      fetch(`http://localhost:5000/allMovies?searchParams=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setMovieData(data);
        });
    }
  }, [search, movies]);

  return (
    <>
      <h3 className="text-center mt-6">
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-4xl">
          <Typewriter
            words={["All Movies _"]}
            loop={Infinity}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={1000}
          />
        </span>
      </h3>
      <p className="w-[90%] md:w-[55%] text-center mx-auto">
        Inception is a mind-bending sci-fi movie about a skilled thief who
        enters dreams to steal secrets but faces a challenging mission to plant
        an idea instead.
      </p>
      <div className="flex-grow border-t border-dashed border-gray-300 my-6 w-[90%] mx-auto"></div>
      <div className="w-1/2 mx-auto relative">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="subject"
          placeholder="Scearch"
          className="w-full p-2 border rounded"
        />
        <span className="absolute top-3 right-4">
          <FaSearch />
        </span>
      </div>
      <div className="w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8 px-4">
        {movieData?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default AllMovies;
