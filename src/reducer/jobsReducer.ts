import type { Job } from "../models/Job";

export type jobsState = {
  loading: boolean;
  jobs: Job[];
  error: string | null;
};

export type JobsActionType =
  | { type: "FETCH_JOBS_REQUEST" }
  | { type: "FETCH_JOBS_SUCCESS"; payload: Job[] }
  | { type: "FETCH_JOBS_ERROR"; payload: string };

export const jobsReducer = (state: jobsState, action: JobsActionType) => {
  switch (action.type) {
    case "FETCH_JOBS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_JOBS_SUCCESS":
      return { ...state, loading: false, jobs: action.payload };
    case "FETCH_JOBS_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
