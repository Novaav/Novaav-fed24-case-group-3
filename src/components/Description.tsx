import {
  LayoutBlockVariation,
  ListType,
  TypographyMetaVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiLayoutBlock,
  DigiList,
  DigiTypography,
  DigiTypographyMeta,
} from "@digi/arbetsformedlingen-react";
import type { ResponseData } from "../models/Education";
import { useEffect, useState } from "react";
import { fetchAllLocations } from "../api/api";
import { getContentByLang } from "../utils/getContentByLang";
import { InfoBox } from "./InfoBox";
import "../css/Infobox.css";
import "../css/Description.css";

interface DescriptionProps {
  education?: ResponseData;
}

export const Description = ({ education }: DescriptionProps) => {
  const [allLocations, setAllLocations] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    fetchAllLocations().then(setAllLocations);
  }, []);

  if (!education) return null;

  const location =
    allLocations.find(
      (l) => l.key === education.eventSummary?.municipalityCode?.[0]
    )?.value || "Okänd plats";
  const title = getContentByLang(education.education?.title);
  const description = getContentByLang(education.education?.description);
  const schoolName = education.providerSummary?.providers;
  const schoolForm = education.education?.form?.code;
  const distance = education.eventSummary?.distance;
  const pace = education.eventSummary?.paceOfStudyPercentage || "Ej angivet";
  const eligibility =
    education.education?.eligibility?.eligibilityDescription[0]?.find(
      (i) => i.lang === "swe"
    )?.content;

  const infoData = {
    program: title || "Okänt program",
    credits: education.education?.credits?.credits || "Ej angivet",
    location,
    pace,
    website: education.education?.url || education.applicationUrl || null,
  };

  return (
    <div style={{ position: "relative" }}>
      <InfoBox education={infoData} />

      <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
        <DigiTypography>
          <h2>{schoolName}</h2>

          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p>{title}</p>
            <p slot="secondary" className="text">
              {schoolName}, {location}, {schoolForm},{" "}
              {distance ? "Distans" : "Platsbunden"}
            </p>
          </DigiTypographyMeta>

          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p>Information om utbildningen</p>
            <DigiList afListType={ListType.BULLET}>
              <li>Stidietakt: {pace} %</li>
              <li>
                {distance ? "Utbildning på distans" : "Platsbunden utbildning"}
              </li>
            </DigiList>
          </DigiTypographyMeta>

          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p>Behörigheter du kommer besitta</p>
            <p slot="secondary">{eligibility}</p>
          </DigiTypographyMeta>

          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p>Beskrivning av utbildningen</p>
            <p
              slot="secondary"
              dangerouslySetInnerHTML={{ __html: description || "" }}
            />
          </DigiTypographyMeta>
        </DigiTypography>
      </DigiLayoutBlock>
    </div>
  );
};
