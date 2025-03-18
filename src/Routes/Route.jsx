import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../Pages/Home";
import NotFount from "../Pages/NotFount";
import AddMovie from "../Pages/AddMovie";
import AllMovies from "../Pages/AllMovies";
import FavoriteMovies from "../Pages/FavoriteMovies";
import MovieDetails from "../Pages/MovieDetails";
import Login from "../Pages/Login";
import AuthLaout from "./AuthLaout";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import UpdateMovie from "../Pages/UpdateMovie";
import ContactSection from "../Pages/ContactSection";
import AboutSection from "../Pages/AboutSection";
import Article from "../components/Article";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFount />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/movies"),
      },
      {
        path: "/allMovies",
        element: <AllMovies />,
        loader: () => fetch("http://localhost:5000/allMovies"),
      },
      {
        path: "/contactSection",
        element: <ContactSection />,
      },
      {
        path: "/aboutSection",
        element: <AboutSection />,
      },
      {
        path: "/article",
        element: <Article />,
      },
      {
        path: "/addMovie",
        element: (
          <PrivateRoute>
            <AddMovie />,
          </PrivateRoute>
        ),
      },
      {
        path: "/updateMovie/:id",
        element: (
          <PrivateRoute>
            <UpdateMovie />,
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/movie/${params.id}`),
      },

      {
        path: "/movieDetails/:id",
        element: (
          <PrivateRoute>
            <MovieDetails />
          </PrivateRoute>
        ),

        loader: ({ params }) =>
          fetch(`http://localhost:5000/movie/${params.id}`),
      },
      {
        path: "/favoriteMovies",
        element: (
          <PrivateRoute>
            <FavoriteMovies />
          </PrivateRoute>
        ),

        loader: () => fetch(`http://localhost:5000/favoriteMovies`),
      },

      {
        path: "auth",
        element: <AuthLaout />,
        children: [
          {
            path: "/auth/register",
            element: <Register />,
          },
          {
            path: "/auth/login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;
