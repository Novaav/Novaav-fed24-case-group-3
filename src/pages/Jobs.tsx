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
            afHeadingLevel={InfoCardMultiHeadingLevel.H5}
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
              <div>
                <span className="employer-label">Företag:</span>{" "}
                <span className="employer">{job.employer?.name}</span>
              </div>
              <div>
                <span className="address-label">Stad:</span>{" "}
                <span className="address">
                  {job.workplace_address?.municipality}
                </span>
              </div>
            </div>

            <Link to={`/jobs/${job.id}`}>Läs mer</Link>
          </DigiInfoCardMulti>
        ))}
      </div>
    </MasterDetailLayout>
  );
};
