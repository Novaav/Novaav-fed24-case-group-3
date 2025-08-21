import { FilterContainer } from "./components/FilterContainer";
import "./css/App.css";
import { router } from "./Router";
import { RouterProvider } from "react-router";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <FilterContainer />
      <GlobalContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </GlobalContextProvider>
    </>
  );
}

export default App;
