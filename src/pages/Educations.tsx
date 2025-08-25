import { useSearchParams } from "react-router";
import { useContext, useEffect } from "react";
import { EducationContext } from "../context/EducationsContext";

export const Educations = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { fetchEducations, educations, loading, error } =
    useContext(EducationContext);

  useEffect(() => {
    fetchEducations(query);
  }, []);

  return (
    <>
      <h1>Utbildningar</h1>
      <p>Sökresultat för: {query}</p>
      {loading && <p>Laddar...</p>}
      {error && <p>Det gick inte att hämta utbildningar.</p>}
      <ul>
        {educations.map((e) => (
          <li key={e.id}>{e.education?.title?.[0]?.content || ""}</li>
        ))}
      </ul>
    </>
  );
};
