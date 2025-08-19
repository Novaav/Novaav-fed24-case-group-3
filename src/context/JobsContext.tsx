import { createContext, useReducer } from "react";
import type { Job } from "../models/Job";
import { fetchJobs } from "../api/api";
import { jobsReducer } from "../reducer/jobsReducer";

export interface IJobsContext {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  fetchJobs: (query: string) => Promise<void>;
}

export const JobsContext = createContext<IJobsContext>({
  jobs: [],
  loading: false,
  error: null,
  fetchJobs: async () => {},
});

export const JobsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(jobsReducer, {
    jobs: [],
    loading: false,
    error: null,
  });

  const fetchJobsHandler = async (query: string) => {
    dispatch({ type: "FETCH_START" });
    try {
      const jobs = await fetchJobs(query);
      dispatch({ type: "FETCH_SUCCESS", payload: jobs });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "FETCH_ERROR", payload: message });
    }
  };

  return (
    <JobsContext.Provider value={{ ...state, fetchJobs: fetchJobsHandler }}>
      {children}
    </JobsContext.Provider>
  );
};
