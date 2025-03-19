import Aos from "aos";
import { useContext, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthorContext";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const handleRating = (rate) => setRating(rate);
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = user.email;
    const moviePoster = form.poster.value;
    const title = form.title.value.trim();
    const genre = form.genre.value;
    const duration = form.duration.value;
    const releaseYear = form.year.value;
    const summary = form.summary.value.trim();

    if (!rating) {
      return toast.error("Please provide a rating!");
    }
    if (!moviePoster.startsWith("http")) {
      return toast.error("Invalid image URL!");
    }
    if (title.length < 2) {
      return toast.error("Title must be at least 2 characters long!");
    }
    if (!genre) {
      return toast.error("Please select a genre!");
    }
    if (!duration || duration < 10) {
      return toast.error("Duration must be at least 10 minutes!");
    }
    if (!releaseYear) {
      return toast.error("Please select a release year!");
    }
    if (!rating) {
      return toast.error("Please provide a rating!");
    }
    if (summary.length < 10) {
      return toast.error("Summary must be at least 10 characters long!");
    }

    const formattedRating = rating;

    const newMovie = {
      email,
      poster: moviePoster,
      title,
      genre,
      duration: Number(duration),
      releaseYear,
      rating: formattedRating,
      summary,
    };
    console.log(email);

    fetch("https://movie-review-tau-three.vercel.app/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Movie added",
            text: "You clicked the button!",
            icon: "success",
          });
          form.reset();
          navigate("/allMovies");
          setRating(0);
        }
      })
      .catch((err) => console.error("❌ Fetch Error:", err));
  };

  return (
    <div
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      className="flex justify-center items-center "
    >
      <div className="max-w-2xl mx-auto mt-4 p-6 text-black hero bg-linear-to-t from-[#1f5b47] to-[#102043]  shadow-md rounded-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-3xl text-white font-bold mb-4 text-center underline">
              Add a New Movie
            </h2>
          </div>
          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">
              Enter Your Email :
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              className="input w-full mb-6"
              readOnly
            />
          </div>
          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">
              Movie Poster URL :
            </label>
            <input
              type="url"
              name="poster"
              placeholder="Movie Poster URL"
              className="input w-full mb-6"
              required
            />
          </div>

          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">Movie TitleL :</label>
            <input
              type="text"
              name="title"
              placeholder="Movie Title"
              className="input w-full mb-6"
              required
            />
          </div>
          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">Select Genre :</label>
            <select name="genre" className="select w-full mb-6">
              <option value="">Select Genre</option>
              <option value="comedy">Romantic</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Action</option>
            </select>
          </div>
          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">Duration :</label>
            <input
              type="number"
              name="duration"
              placeholder="Duration (minutes)"
              className="input w-full mb-6"
              required
            />
          </div>
          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">Selected Year :</label>
            <select name="year" className="select w-full mb-6">
              <option value="">Select Year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">Summary :</label>
            <textarea
              name="summary"
              placeholder="Movie Summary"
              className="textarea w-full mb-6"
              required
            ></textarea>
          </div>

          <div className="flex gap-24">
            <h2 className="mb-5 text-white font-semibold">Rate This Movie :</h2>
            <Rating
              className="rotate-90 -mb-16 -mt-16"
              onClick={handleRating}
              ratingValue={rating}
              size={30}
            />
          </div>

          <button
            type="submit "
            className="btn rounded-none w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
