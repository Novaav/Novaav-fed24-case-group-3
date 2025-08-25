import { useSearchParams } from "react-router";
import { useContext, useEffect } from "react";
import { EducationContext } from "../context/EducationsContext";
import { filterForLocation, filterForPaceOfStudy } from "../utils/Filter";
import "../css/educations.css";
import { EducationCard } from "../components/EducationCard";

export const Educations = () => {
  const [searchParams] = useSearchParams();
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
  const filteredEducations = filterData();
  return (
    <>
      <div className="columns">
        <aside className="sidebar">
          <h1>Utbildningar</h1>
          {loading && <p>Laddar...</p>}
          {error && <p>Det gick inte att hämta utbildningar.</p>}
          <ul>
            {educations.map((e) => (
              <EducationCard key={e.id} education={e} />
            ))}
          </ul>
        </aside>
        {/* Description / Main content component goes here*/}
        <main className="main-content"></main>
      </div>
    </>
  );
};
