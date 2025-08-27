import { useSearchParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import type { ResponseData } from "../models/Education";
import { Description } from "../components/Description";
import { MasterDetailLayout } from "./MasterDetailLayout";
import { EducationContext } from "../context/EducationsContext";

export const Educations = () => {
  const [searchParams] = useSearchParams();
  const [education, setEducation] = useState<ResponseData>();
  const query = searchParams.get("query") || "";

  const { fetchEducations } = useContext(EducationContext);

  useEffect(() => {
    fetchEducations(query);
  }, [query]);

  return (
    <MasterDetailLayout onEducationClick={setEducation}>
      {education ? (
        <Description education={education} />
      ) : (
        <p>Välj en utbildning i listan!</p>
      )}
    </MasterDetailLayout>
  );
};
