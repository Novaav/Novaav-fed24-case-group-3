import { useContext, useEffect } from "react";
import { JobsContext } from "../context/JobsContext";
import { MasterDetailLayout } from "./MasterDetailLayout";
import { Link, useSearchParams } from "react-router";

export const Jobs = () => {
  const { jobs, fetchJobs } = useContext(JobsContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    fetchJobs(query);
  }, []);
  return (
    <MasterDetailLayout>
      <p>Visar jobb relaterade till: {query}</p>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.headline}
            <Link to={`/jobs/${job.id}`}>Läs mer</Link>
          </li>
        ))}
      </ul>
    </MasterDetailLayout>
  );
};
