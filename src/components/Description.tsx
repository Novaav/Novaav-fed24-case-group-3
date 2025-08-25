import {
  LayoutBlockVariation,
  TypographyMetaVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiLayoutBlock,
  DigiTypography,
  DigiTypographyMeta,
} from "@digi/arbetsformedlingen-react";

export const Description = () => {
  return (
    <>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
        <DigiTypography>
          <h2>Skolnamn plus ev icon</h2>
          <p> utbildning, title från Education</p>
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
