import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import ContactSection from "./ContactSection";
import { FaEye } from "react-icons/fa6";
import AboutSection from "./AboutSection";

const Home = () => {
  const movies = useLoaderData();

  const [loadMovies, setLoadMovies] = useState(movies);
  return (
    <div>
      <section>
        <Banner />
      </section>

      <section className="">
        <div>
          <h3 className="text-center mt-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-4xl">
              <Typewriter
                words={["My Movies _"]}
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
            enters dreams to steal secrets but faces a challenging mission to
            plant an idea instead.
          </p>
        </div>
        <div className="flex-grow border-t border-dashed border-gray-300 my-6 w-[90%] mx-auto"></div>

        <div className="w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8 px-4">
          {movies?.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              loadMovies={loadMovies}
              setLoadMovies={setLoadMovies}
            />
          ))}
        </div>
        <Link to="/allMovies">
          <button className="btn mx-auto flex items-center justify-center my-8 w-[10%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500  hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500">
            <FaEye /> <span>See More</span>
          </button>
        </Link>
      </section>
      <section>
        <AboutSection />
        <ContactSection />
      </section>
    </div>
  );
};

export default Home;
