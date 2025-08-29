import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Educations } from "./pages/Educations";
import { Jobs } from "./pages/Jobs";
import { JobDetails } from "./pages/JobDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/educations", element: <Educations /> },
      { path: "/jobs", element: <Jobs /> }, // Lista relaterade jobb
      { path: "/jobs/:id", element: <JobDetails /> }, // Detaljsida för jobb
    ],
  },
]);
