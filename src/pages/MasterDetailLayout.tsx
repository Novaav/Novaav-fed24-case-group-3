import type { ReactNode } from "react";
import { useContext } from "react";
import { EducationContext } from "../context/EducationsContext";
import { EducationCard } from "../components/EducationCard";
import { filterForLocation, filterForPaceOfStudy } from "../utils/Filter";
import "../css/MasterDetailLayout.css";
import "../css/educations.css";

export const MasterDetailLayout = ({
  children,
  onEducationClick,
}: {
  children: ReactNode;
  onEducationClick?: (education: any) => void;
}) => {
  const { educations, loading, error, filterLocation, filterPaceOfStudy } =
    useContext(EducationContext);

  const filterData = () => {
    const filter1 = filterForPaceOfStudy(educations, filterPaceOfStudy);
    return filterForLocation(filter1, filterLocation);
  };
  const filteredEducations = filterData();

  return (
    <div className="columns">
      <aside className="sidebar">
        {loading && <p>Laddar...</p>}
        {error && <p>Det gick inte att hämta utbildningar.</p>}
        <ul>
          {filteredEducations.map((education) => (
            <EducationCard
              key={education.id}
              education={education}
              handleClick={() => onEducationClick?.(education)}
            />
          ))}
        </ul>
      </aside>
      <main className="content-wrapper">{children}</main>
    </div>
  );
};
