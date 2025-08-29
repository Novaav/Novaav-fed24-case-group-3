import { DigiInfoCard } from "@digi/arbetsformedlingen-react";
import "../css/EducationCard.css";
import {
  InfoCardHeadingLevel,
  InfoCardSize,
  InfoCardType,
  InfoCardVariation,
} from "@digi/arbetsformedlingen";
import { useRef, useEffect } from "react";

interface Subject {
  code: string;
  name?: string;
}

interface EducationData {
  id: string;
  education?: {
    title?: { content: string }[];
    description?: { content: string }[];
    subject?: Subject[];
  };
  providerSummary?: {
    providers: string[];
  };
  eventSummary?: {
    paceOfStudyPercentage?: number[];
  };
}

export const EducationCard = ({
  education,
  handleClick,
  isActive,
}: {
  education: EducationData;
  handleClick: () => void;
  isActive: boolean;
}) => {
  const cardRef = useRef<HTMLLIElement>(null);

  // Smooth scroll och centrering i sidebar när kortet är aktivt
  useEffect(() => {
    if (isActive && cardRef.current) {
      const sidebar = cardRef.current.closest(".sidebar");
      if (!sidebar) return;

      const cardTop = cardRef.current.offsetTop;
      const cardHeight = cardRef.current.offsetHeight;
      const sidebarHeight = (sidebar as HTMLElement).clientHeight;

      // Scrolla så kortet hamnar i mitten av sidebar
      (sidebar as HTMLElement).scrollTo({
        top: cardTop - sidebarHeight / 2 + cardHeight / 2,
        behavior: "smooth",
      });
    }
  }, [isActive]);

  return (
    <li
      ref={cardRef}
      className={`education-card ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <DigiInfoCard
        afHeading={education.education?.title?.[0]?.content || ""}
        afHeadingLevel={InfoCardHeadingLevel.H3}
        afType={InfoCardType.TIP}
        afVariation={InfoCardVariation.SECONDARY}
        afSize={InfoCardSize.STANDARD}
      >
        <div className="card-info">
          <div>
            <strong>Ämnesområde:</strong>{" "}
            {education.education?.subject?.map((s) => s.name).join(", ") || "-"}
          </div>
          <div className="provider-row">
            <span className="provider-label">Skola:</span>
            <span className="providers">
              {education.providerSummary?.providers?.join(", ") || "-"}
            </span>
          </div>
          <div className="pace-row">
            <span className="pace-label">Studietakt:</span>
            <span className="pace">
              {education.eventSummary?.paceOfStudyPercentage
                ? education.eventSummary.paceOfStudyPercentage.join(", ") + "%"
                : "-"}
            </span>
          </div>
          <div>
            <strong>Utbildningskod:</strong> {education.id}
          </div>
        </div>
      </DigiInfoCard>
    </li>
  );
};
