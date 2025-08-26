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
}: {
  education: EducationData;
  handleClick: () => void;
}) => (
  <li className="education-card" onClick={handleClick}>
    {/*<h4>{education.education?.title?.[0]?.content || ""}</h4>
    <p>
      {education.education?.description?.[0]?.content?.slice(0, 60) + "..." ||
        ""}
    </p>
    <p className="providers">{education.providerSummary?.providers}</p>
    <p>{education.eventSummary?.paceOfStudyPercentage}%</p>*/}
    <DigiInfoCard
      afHeading={education.education?.title?.[0]?.content || ""}
      afHeadingLevel={InfoCardHeadingLevel.H2}
      afType={InfoCardType.TIP}
      afVariation={InfoCardVariation.PRIMARY}
      afSize={InfoCardSize.STANDARD}
    >
      <p>
        {education.education?.description?.[0]?.content?.slice(0, 60) + "..." ||
          ""}
        <div className="card-info">
          <div className="provider-row">
            <span className="provider-label">Skola:</span>
            <span className="providers">
              {education.providerSummary?.providers?.join(", ")}
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
        </div>
      </p>
    </DigiInfoCard>
  </li>
);
