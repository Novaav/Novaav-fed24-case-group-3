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
import { useEffect, useState } from "react";
import { fetchAllLocations } from "../api/api";
import { Link } from "react-router";
import { getContentByLang } from "../utils/getContentByLang";
import { useSearchParams } from "react-router";

interface DescriptionProps {
  education?: ResponseData;
}
export const Description = ({ education }: DescriptionProps) => {
  const [allLocations, setAllLocations] = useState<
    { key: string; value: string }[]
  >([]);

  const getLocations = async () => {
    const locations = await fetchAllLocations();
    setAllLocations(locations);
  };

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    getLocations();
  }, []);

  const matchLocation = education?.eventSummary?.municipalityCode?.[0];
  const location = allLocations.find((l) => l.key === matchLocation)?.value;

  const title = getContentByLang(education?.education?.title);

  const description = getContentByLang(education?.education?.description);

  const schoolName = education?.providerSummary?.providers;
  const schoolForm = education?.education?.form?.code;
  const systemCode = education?.education?.credits?.system?.code;
  const credits = education?.education?.credits?.credits;
  const distance = education?.eventSummary?.distance;
  const pace = education?.eventSummary?.paceOfStudyPercentage;

  const eligibilitys =
    education?.education?.eligibility?.eligibilityDescription[0];
  console.log(eligibilitys);
  const findEligibility = eligibilitys?.find((i) => i.lang === "swe");
  const eligibility = findEligibility?.content;

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
            <p> Information om utbildningen</p>
            <p slot="secondary"> Studietakt : {pace} % </p>
            <p slot="secondary">
              Platsbunden/ distans :{" "}
              {distance ? "Utbildning på distans" : "Platsbunden utbildning"}{" "}
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
              dangerouslySetInnerHTML={{ __html: description ?? "" }}
            ></p>
          </DigiTypographyMeta>
          <Link
            to={`/jobs?query=${encodeURIComponent(query)}`}
          >{`Se relaterade yrken >`}</Link>
        </DigiTypography>
      </DigiLayoutBlock>
    </>
  );
};
