import type { ReactNode } from "react";
import { useContext, useState } from "react";
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
  const [activeId, setActiveId] = useState<string | null>(null);
  const { educations, loading, error, filterLocation, filterPaceOfStudy } =
    useContext(EducationContext);

  const filterData = () => {
    const filter1 = filterForPaceOfStudy(educations, filterPaceOfStudy);
    return filterForLocation(filter1, filterLocation);
  };
  const filteredEducations = filterData();

  const handleEducationClick = (education: any) => {
    setActiveId(education.id); // markera det här kortet som aktivt
    onEducationClick?.(education); // kör ev. callback från props
  };
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
              handleClick={() => handleEducationClick?.(education)}
              isActive={education.id === activeId}
            />
          ))}
        </ul>
      </aside>
      <main className="content-wrapper">{children}</main>
    </div>
  );
};
