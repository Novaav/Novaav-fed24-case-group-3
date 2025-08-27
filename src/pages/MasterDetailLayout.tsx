import type { ReactNode } from "react";
import { useContext } from "react";
import { EducationContext } from "../context/EducationsContext";
import { EducationCard } from "../components/EducationCard";
import { filterForLocation, filterForPaceOfStudy } from "../utils/Filter";
import "../css/MasterDetailLayout.css";
import "../css/educations.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const MasterDetailLayout = ({
  children,
  onEducationClick,
}: {
  children: ReactNode;
  onEducationClick?: (education: any) => void;
}) => {
  const { educations, loading, error, filterLocation, filterPaceOfStudy } =
    useContext(EducationContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filterData = () => {
    const filter1 = filterForPaceOfStudy(educations, filterPaceOfStudy);
    return filterForLocation(filter1, filterLocation);
  };
  const filteredEducations = filterData();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="columns">
      <aside className="sidebar">
        {loading && <p>Laddar...</p>}
        {error && <p>Det gick inte att hämta utbildningar.</p>}
        {isMobile ? (
          <Slider {...sliderSettings}>
            {filteredEducations.map((education) => (
              <div key={education.id}>
                <EducationCard
                  education={education}
                  handleClick={() => onEducationClick?.(education)}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <ul>
            {filteredEducations.map((education) => (
              <EducationCard
                key={education.id}
                education={education}
                handleClick={() => onEducationClick?.(education)}
              />
            ))}
          </ul>
        )}
      </aside>
      <main className="content-wrapper">{children}</main>
    </div>
  );
};
