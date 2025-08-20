import "./css/App.css";
import { router } from "./Router";
import { RouterProvider } from "react-router";

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <h1>Case 1, grupp 3</h1>
    </>
  );
}

export default App;
