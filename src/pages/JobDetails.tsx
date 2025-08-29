import { useNavigate, useParams } from "react-router";
import { MasterDetailLayout } from "./MasterDetailLayout";
import { useContext } from "react";
import { JobsContext } from "../context/JobsContext";
import {
  DigiButton,
  DigiLayoutBlock,
  DigiTypography,
  DigiTypographyMeta,
} from "@digi/arbetsformedlingen-react";
import {
  ButtonSize,
  ButtonVariation,
  LayoutBlockVariation,
  TypographyMetaVariation,
} from "@digi/arbetsformedlingen";
import "../css/JobDetails.css";

export const JobDetails = () => {
  const { id } = useParams();
  const { jobs } = useContext(JobsContext);
  const navigate = useNavigate();

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
        <DigiButton
          afSize={ButtonSize.MEDIUM}
          afVariation={ButtonVariation.SECONDARY}
          afFullWidth={false}
          onClick={() => navigate(-1)}
        >
          Gå tillbaka
        </DigiButton>

        <div className="job-description-wrapper">
          <div className="job-card">
            {/* Logga + Titel */}
            <div className="job-header">
              {job.logo_url && (
                <img
                  src={job.logo_url}
                  alt={`${job.employer?.name} logotyp`}
                  className="job-logo"
                />
              )}
              <h2 className="job-title">{job.headline}</h2>
            </div>

            {/* Jobbdetaljer */}
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
          </div>
        </div>
      </DigiLayoutBlock>
    </MasterDetailLayout>
  );
};
