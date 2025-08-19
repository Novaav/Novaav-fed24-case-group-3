import type { Job } from "../models/Job";

export async function fetchJobs(query: string): Promise<Job[]> {
  const res = await fetch(
    `https://jobsearch.api.jobtechdev.se/search?q=${query}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  const data = await res.json();
  return data.hits as Job[];
}
