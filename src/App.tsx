import "./css/App.css";
import { JobsContext, JobsContextProvider } from "./context/JobsContext";
import { useContext, useEffect } from "react";
import {
  EducationContext,
  EducationContextProvider,
} from "./context/EducationsContext";

const TestComponent = () => {
  const { fetchJobs, jobs } = useContext(JobsContext);

  useEffect(() => {
    fetchJobs("utvecklare");
  }, []);

  console.log(jobs);

  return <div>Test Component</div>;
};

const TestComponent2 = () => {
  const { fetchEducations, educations } = useContext(EducationContext);

  useEffect(() => {
    fetchEducations("utvecklare");
  }, []);

  console.log(educations);

  return <div>Test Component 2</div>;
};

function App() {
  return (
    <JobsContextProvider>
      <EducationContextProvider>
        <h1>Case 1, grupp 3</h1>
        <TestComponent />
        <TestComponent2 />
      </EducationContextProvider>
    </JobsContextProvider>
  );
}

export default App;
