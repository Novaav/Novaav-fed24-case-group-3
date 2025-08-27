import { useContext, useEffect } from "react";
import { JobsContext } from "../context/JobsContext";
import { MasterDetailLayout } from "./MasterDetailLayout";
import { Link, useSearchParams } from "react-router";
import { DigiInfoCardMulti } from "@digi/arbetsformedlingen-react";
import {
  InfoCardMultiHeadingLevel,
  InfoCardMultiType,
} from "@digi/arbetsformedlingen";
import "../css/Jobs.css";

export const Jobs = () => {
  const { jobs, fetchJobs } = useContext(JobsContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    fetchJobs(query);
  }, []);

  return (
    <MasterDetailLayout>
      <div className="jobs-container">
        {jobs.map((job) => (
          <DigiInfoCardMulti
            afHeading={job.headline}
            afHeadingLevel={InfoCardMultiHeadingLevel.H3}
            afType={InfoCardMultiType.RELATED}
            key={job.id}
            className="job-card"
          >
            {job.logo_url && (
              <img
                src={job.logo_url}
                alt={`${job.employer?.name} logotyp`}
                className="job-logo"
              />
            )}
            <div className="job-ad-details">
              <p>
                <strong>Företag:</strong> {job.employer?.name}
              </p>
              <p>
                <strong>Stad:</strong> {job.workplace_address?.municipality}
              </p>
            </div>

            <Link to={`/jobs/${job.id}`}>Läs mer</Link>
          </DigiInfoCardMulti>
        ))}
      </div>
    </MasterDetailLayout>
  );
};
