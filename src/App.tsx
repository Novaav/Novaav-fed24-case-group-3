import "./css/App.css";
import { JobsContextProvider } from "./context/JobsContext";
import { useEffect } from "react";
import { fetchJobs } from "./api/api";

function App() {
  useEffect(() => {
    // Fetch initial jobs data
    const fetch = async () => {
      // Call the fetchJobs function from context
      const fetchedJobs = await fetchJobs("utvecklare");
      console.log(fetchedJobs);
    };

    fetch();
  }, []);

  return (
    <JobsContextProvider>
      <h1>Case 1, grupp 3</h1>
    </JobsContextProvider>
  );
}

export default App;
