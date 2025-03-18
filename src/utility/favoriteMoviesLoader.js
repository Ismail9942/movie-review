import { useContext } from "react";
import { AuthContext } from "../Auth/AuthorContext";

export const favoriteMoviesLoader = async () => {
  const { user } = useContext(AuthContext);

  if (!user?.email) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const response = await fetch(
    `http://localhost:5000/favoriteMovies?email=${user.email}`
  );
  if (!response.ok) {
    throw new Response("Failed to fetch data", { status: response.status });
  }
  return response.json();
};
