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
        <DigiTypography>
          <h2>{job.headline}</h2>
          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p>Beskrivning</p>
            <p slot="secondary">{job.description?.text}</p>
          </DigiTypographyMeta>
          {/* Lägg till mer info om jobbet här om du vill */}
        </DigiTypography>
      </DigiLayoutBlock>
    </MasterDetailLayout>
  );
};
