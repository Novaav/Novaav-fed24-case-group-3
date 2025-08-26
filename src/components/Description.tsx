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
  // hittar titlar, letar och hittar swe. gör variabel av den och använder i return
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
  return (
    <>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
        <DigiTypography>
          <h2>{schoolName}</h2>
          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <p> {title && title}</p>
            <p slot="secondary" className="text">
              {" "}
              {schoolForm}, {credits} {systemCode?.toUpperCase()}
            </p>
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
