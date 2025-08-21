import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/educations",
      },
    ],
  },
]);
