import type { Education, ResponseData } from "../models/Education";
import type { Job } from "../models/Job";

export const fetchJobs = async (query: string): Promise<Job[]> => {
  const res = await fetch(
    `https://jobsearch.api.jobtechdev.se/search?q=${query}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  const data = await res.json();
  return data.hits as Job[];
};

export const fetchEducations = async (
  query: string
): Promise<ResponseData[]> => {
  const res = await fetch(
    `https://jobed-connect-api.jobtechdev.se/v1/educations?query=${query}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch educations");
  }
  const data = await res.json();
  return data.result as ResponseData[];
};
