import { useSearchParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { EducationContext } from "../context/EducationsContext";
import { filterForLocation, filterForPaceOfStudy } from "../utils/Filter";
import "../css/educations.css";
import { EducationCard } from "../components/EducationCard";
import type { ResponseData } from "../models/Education";
import { Description } from "../components/Description";

export const Educations = () => {
  const [searchParams] = useSearchParams();
  const [education, setEducation] = useState<ResponseData>();
  const query = searchParams.get("query") || "";
  const {
    fetchEducations,
    educations,
    loading,
    error,
    filterLocation,
    filterPaceOfStudy,
  } = useContext(EducationContext);

  useEffect(() => {
    fetchEducations(query);
  }, [query]);
  console.log(educations);

  const filterData = () => {
    const filter1 = filterForPaceOfStudy(educations, filterPaceOfStudy);
    const filteredData = filterForLocation(filter1, filterLocation);
    return filteredData;
  };
  // filtrerar på all fetchad data, även när det ändras
  const filteredEducations = filterData();
  return (
    <>
      <div className="columns">
        <aside className="sidebar">
          {loading && <p>Laddar...</p>}
          {error && <p>Det gick inte att hämta utbildningar.</p>}
          <ul>
            {filteredEducations.map((education) => (
              <EducationCard
                key={education.id}
                education={education}
                handleClick={() => setEducation(education)}
              />
            ))}
          </ul>
        </aside>
        {education ? (
          <Description education={education} />
        ) : (
          <p>Hej! anropa mig, en annan komponent. Wopidop</p>
        )}
      </div>
    </>
  );
};
