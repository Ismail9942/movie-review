import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./Routes/Route.jsx";
import AuthorContext from "./Auth/AuthorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthorContext>
      <RouterProvider router={router} />
    </AuthorContext>
  </StrictMode>
);
