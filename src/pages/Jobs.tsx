import { useContext, useEffect } from "react";
import { JobsContext } from "../context/JobsContext";
import { MasterDetailLayout } from "./MasterDetailLayout";
import { Link, useSearchParams } from "react-router";
import {
  DigiInfoCard,
  DigiInfoCardMulti,
  DigiInfoCardMultiContainer,
  DigiLayoutColumns,
} from "@digi/arbetsformedlingen-react";
import {
  InfoCardMultiHeadingLevel,
  InfoCardMultiType,
  LayoutColumnsElement,
  LayoutColumnsVariation,
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
            afHeadingLevel={InfoCardMultiHeadingLevel.H2}
            afType={InfoCardMultiType.RELATED}
            key={job.id}
          >
            <Link to={`/jobs/${job.id}`}>Läs mer</Link>
          </DigiInfoCardMulti>
        ))}
      </div>
    </MasterDetailLayout>
  );
};
