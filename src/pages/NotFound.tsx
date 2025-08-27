import {
  TypographyMetaVariation,
  TypographyVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiButton,
  DigiTypography,
  DigiTypographyMeta,
} from "@digi/arbetsformedlingen-react";
import { useNavigate } from "react-router";

export const NotFound = () => {
  // function navigate(arg0: string): void {
  //   throw new Error("Function not implemented.");
  // }

  const navigate = useNavigate();

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      <DigiTypography afVariation={TypographyVariation.SMALL}>
        <h1>404 – Sidan kunde inte hittas</h1>

        <DigiTypographyMeta afVariation={TypographyMetaVariation.MEDIUM}>
          Ojdå! Sidan du letade efter verkar inte finnas. Kontrollera adressen
          eller gå tillbaka till startsidan.
        </DigiTypographyMeta>

        <DigiButton onClick={() => navigate("/")}>Till startsidan</DigiButton>
      </DigiTypography>
    </section>
  );
};
