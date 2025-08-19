import type { Job } from "../models/Job";

export type jobsState = {
  loading: boolean;
  jobs: Job[];
  error: string | null;
};

export type JobsActionType =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Job[] }
  | { type: "FETCH_ERROR"; payload: string };

export const jobsReducer = (state: jobsState, action: JobsActionType) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, jobs: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
