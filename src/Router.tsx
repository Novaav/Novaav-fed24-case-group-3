import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Educations } from "./pages/Educations";

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
        element: <Educations />,
        children: [
          // innan en användare väljer ett utbildningskort visas uppmuntran att välja ett kort för att se en detalierad baskrivning
          { index: true, element: <EmptyEducationView /> },

          {
            // /educations/:id
            path: ":educationId",
            element: <EducationDetail />, // Utbildningsbeskrivning
            children: [
              { path: "jobs", element: <JobsCards /> },
              { path: "jobs/:jobId", element: <JobDetail /> },
            ],
          },
        ],
      },
    ],
  },
]);
