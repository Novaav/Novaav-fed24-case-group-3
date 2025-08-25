import "../css/EducationCard.css";

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

export const EducationCard = ({ education }: { education: EducationData }) => (
  <li className="education-card">
    <h4>{education.education?.title?.[0]?.content || ""}</h4>
    <p>
      {education.education?.description?.[0]?.content.slice(0, 60) + "..." ||
        ""}
    </p>
    <p className="providers">{education.providerSummary?.providers}</p>
    <p>{education.eventSummary?.paceOfStudyPercentage}%</p>
  </li>
);
