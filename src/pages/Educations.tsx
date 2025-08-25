import { useSearchParams } from "react-router";
import { useContext, useEffect } from "react";
import { EducationContext } from "../context/EducationsContext";
import { filterForLocation, filterForPaceOfStudy } from "../utils/Filter";

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
      <h1>Utbildningar</h1>
      <p>Sökresultat för: {query}</p>
      {loading && <p>Laddar...</p>}
      {error && <p>Det gick inte att hämta utbildningar.</p>}
      <ul>
        {filteredEducations.map((e) => (
          <li key={e.id}>{e.education?.title?.[0]?.content || ""}</li>
        ))}
      </ul>
    </>
  );
};
