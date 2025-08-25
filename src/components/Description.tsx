import {
  LayoutBlockVariation,
  TypographyMetaVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiLayoutBlock,
  DigiTypography,
  DigiTypographyMeta,
} from "@digi/arbetsformedlingen-react";
import { useContext, useEffect } from "react";
import { EducationContext } from "../context/EducationsContext";
// kommer behöva en prop för education
export const Description = () => {
  const { educations, fetchEducations } = useContext(EducationContext);

  useEffect(() => {
    fetchEducations("förskollärare");
  }, []);

  const education = educations[0];
  console.log("HÄÄÄR", education);

  const titles = education?.education?.title ?? null;
  const findedTitle = titles?.find((i) => i.lang === "swe");
  const title = findedTitle?.content;
  console.log("title: ", title);

  return (
    <>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
        <DigiTypography>
          <h2>Skolnamn plus ev icon</h2>
          <p> utbildning, {title ? title : "ingen titel"}</p>
          <p> utbildning, {title ?? "ingen titel"}</p>
          <p> utbildning, {title && title}</p>
          <p> utbildning, {title}</p>
          <p>skola plus plats</p>
          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p>Beskrivning av utbildningen</p>
            <p slot="secondary">description från Educations</p>
          </DigiTypographyMeta>
        </DigiTypography>
      </DigiLayoutBlock>
    </>
  );
};
