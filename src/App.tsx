import "./css/App.css";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalContextProvider>
      <h1>Case 1, grupp 3</h1>
    </GlobalContextProvider>
  );
}

export default App;
