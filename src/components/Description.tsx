import {
  LayoutBlockVariation,
  TypographyMetaVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiLayoutBlock,
  DigiTypography,
  DigiTypographyMeta,
} from "@digi/arbetsformedlingen-react";
import type { ResponseData } from "../models/Education";
import "../css/Description.css";
interface DescriptionProps {
  education?: ResponseData;
}
export const Description = ({ education }: DescriptionProps) => {
  const titles = education?.education?.title ?? null;
  const findedTitle = titles?.find((i) => i.lang === "swe");
  const title = findedTitle?.content;

  const description = education?.education?.description;
  const findDesc = description?.find((i) => i.lang === "swe");
  const desc = findDesc?.content;

  const schoolName = education?.providerSummary?.providers;
  const schoolForm = education?.education?.form?.code;
  const systemCode = education?.education?.credits?.system?.code;
  const credits = education?.education?.credits?.credits;
  const location = education?.eventSummary?.municipalityCode;
  const distance = education?.eventSummary?.distance;

  const eligibilitys =
    education?.education?.eligibility?.eligibilityDescription[0];
  console.log(eligibilitys);
  const findEligibility = eligibilitys?.find((i) => i.lang === "swe");
  const eligibility = findEligibility?.content;
  console.log(eligibility);

  return (
    <>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
        <DigiTypography>
          <h2>{schoolName}</h2>
          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p> {title && title}</p>
            <p slot="secondary" className="text">
              {" "}
              {/* {schoolForm}, {credits} {systemCode?.toUpperCase()} */}
              {schoolName} , {location} , {schoolForm} ,{" "}
              {distance ? "Distans" : "Platsbunden"}
            </p>
          </DigiTypographyMeta>
          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p> Behörigheter du kommer besitta </p>
            <p slot="secondary"> {eligibility}</p>
          </DigiTypographyMeta>
          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p>Beskrivning av utbildningen</p>
            <p
              slot="secondary"
              dangerouslySetInnerHTML={{ __html: desc ?? "" }}
            ></p>
          </DigiTypographyMeta>
        </DigiTypography>
      </DigiLayoutBlock>
    </>
  );
};
