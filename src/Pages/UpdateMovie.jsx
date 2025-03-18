import Aos from "aos";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateMovie = () => {
  const movie = useLoaderData();
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleRating = (rate) => setRating(rate);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const moviePoster = form.poster.value.trim();
    const title = form.title.value.trim();
    const genre = form.genre.value.trim();
    const duration = form.duration.value.trim();
    const releaseYear = form.year.value.trim();
    const summary = form.summary.value.trim();

    if (
      !moviePoster ||
      !title ||
      !genre ||
      genre === "Select Genre" ||
      !duration ||
      !releaseYear ||
      releaseYear === "Select Year" ||
      // !formattedRating ||
      !summary
    ) {
      toast.error("Please fill all required fields before updating!");
      return;
    }

    const formattedRating = rating;

    const updatedMovie = {
      email,
      poster: moviePoster,
      title,
      genre,
      duration: Number(duration),
      releaseYear,
      rating: formattedRating,
      summary,
    };

    fetch(`http://localhost:5000/updateMovie/${movie._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Movie updated",
            text: "movie Update successfull",
            icon: "success",
          });

          form.reset();
          navigate(`/movieDetails/${movie._id}`);
          setRating(0);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
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
              Update Movie
            </h2>
          </div>
          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">
              Enter Your Email :
            </label>
            <input
              type="email"
              readOnly
              name="email"
              defaultValue={movie?.email}
              className="input w-full mb-6"
            />
          </div>
          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">
              Movie Poster URL :
            </label>
            <input
              type="url"
              name="poster"
              defaultValue={movie?.poster}
              className="input w-full mb-6"
              required
            />
          </div>

          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">Movie TitleL :</label>
            <input
              type="text"
              name="title"
              defaultValue={movie?.title}
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
              defaultValue={movie?.duration}
              className="input w-full mb-6"
              required
            />
          </div>
          <div className="w-full flex gap-4">
            <label className="text-white mb-2 flex-1/3">Selected Year :</label>
            <select
              name="year"
              defaultValue={movie.releaseYear}
              className="select w-full mb-6"
            >
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
              defaultValue={movie?.summary}
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
            Update Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
