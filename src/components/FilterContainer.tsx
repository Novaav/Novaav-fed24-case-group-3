import { useContext, useEffect, useState } from "react";
import { SelectFilter } from "./SelectFilter";
import { EducationContext } from "../context/EducationsContext";
import type { ResponseData } from "../models/Education";

export const FilterContainer = () => {
  const [locationData, setLocationData] = useState<
    { id: string; label: string }[]
  >([]);
  const [paceOfStudy, setPaceOfStudy] = useState<
    { id: string; label: string }[]
  >([]);
  const { educations, setFilterLocation, setFilterPaceOfStudy } =
    useContext(EducationContext);

  const getPaceOfStudies = (data: ResponseData[]) => {
    let paceOfStudyList: { id: string; label: string }[] = [];

    data.forEach((item) => {
      const paceOfStudy = item.eventSummary?.paceOfStudyPercentage?.[0];
      const exist = paceOfStudyList.find(
        (i) => i.id === JSON.stringify(paceOfStudy)
      );
      if (!exist) {
        paceOfStudyList.push({
          id: JSON.stringify(paceOfStudy),
          label: JSON.stringify(paceOfStudy) + "%",
        });
      }
    });
    setPaceOfStudy(paceOfStudyList);
  };

  useEffect(() => {
    fetch("https://jobed-connect-api.jobtechdev.se/v1/searchparameters/regions")
      .then((data) => {
        return data.json();
      })
      .then((data: { key: string; value: string }[]) => {
        const newData = data.map((item) => {
          return { id: item.key, label: item.value };
        });
        setLocationData(newData);
      });
  }, []);
  useEffect(() => {
    if (educations.length > 0) {
      getPaceOfStudies(educations);
    }
  }, [educations]);

  return (
    <>
      <SelectFilter
        buttonText="Filtrera"
        legend="Filtrera område"
        label="Plats"
        listItems={locationData}
        onReset={() => setFilterLocation([])}
        onSubmit={(list: string[]) => setFilterLocation(list)}
      />
      <SelectFilter
        buttonText="Filtrera"
        legend="Välj på heltid/deltid"
        label="Studietakt"
        listItems={paceOfStudy}
        onReset={() => setFilterPaceOfStudy([])}
        onSubmit={(list: string[]) => setFilterPaceOfStudy(list)}
      />
    </>
  );
};
