import { DigiInfoCard } from "@digi/arbetsformedlingen-react";
import "../css/EducationCard.css";
import {
  InfoCardHeadingLevel,
  InfoCardSize,
  InfoCardType,
  InfoCardVariation,
} from "@digi/arbetsformedlingen";

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
  return (
    <>
      <li
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
              {education.education?.subject?.map((s) => s.name).join(", ") ||
                "-"}
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
                  ? education.eventSummary.paceOfStudyPercentage.join(", ") +
                    "%"
                  : "-"}
              </span>
            </div>
            <div>
              <strong>Utbildningskod:</strong> {education.id}
            </div>
          </div>
        </DigiInfoCard>
      </li>
    </>
  );
};
