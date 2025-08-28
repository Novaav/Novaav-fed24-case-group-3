import { useParams } from "react-router";
import { MasterDetailLayout } from "./MasterDetailLayout";
import { useContext } from "react";
import { JobsContext } from "../context/JobsContext";
import {
  DigiLayoutBlock,
  DigiTypography,
  DigiTypographyMeta,
} from "@digi/arbetsformedlingen-react";
import {
  LayoutBlockVariation,
  TypographyMetaVariation,
} from "@digi/arbetsformedlingen";
import "../css/JobDetails.css";

export const JobDetails = () => {
  const { id } = useParams();
  const { jobs } = useContext(JobsContext);

  const job = jobs.find((job) => job.id === id);

  if (!job)
    return (
      <MasterDetailLayout>
        <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
          <DigiTypography>
            <h2>Jobb hittades inte.</h2>
          </DigiTypography>
        </DigiLayoutBlock>
      </MasterDetailLayout>
    );

  return (
    <MasterDetailLayout>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
        <div className="job-header-container">
          {job.logo_url ? (
            <img
              src={job.logo_url}
              alt={`${job.employer?.name} logotyp`}
              className="job-logo-big"
            />
          ) : null}

          <div className="job-details-content">
            <DigiTypography>
              <h2>{job.headline}</h2>
              <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
                <p>
                  <strong>Företag:</strong> {job.employer?.name}
                </p>
                <p>
                  <strong>Ort:</strong> {job.workplace_address?.municipality}
                </p>
                <p>
                  <strong>Region:</strong> {job.workplace_address?.region}
                </p>
                <p>
                  <strong>Beskrivning:</strong>
                </p>
                <p slot="secondary">{job.description?.text}</p>
              </DigiTypographyMeta>
            </DigiTypography>
          </div>
        </div>
      </DigiLayoutBlock>
    </MasterDetailLayout>
  );
};
