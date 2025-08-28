import { useNavigate } from "react-router";
import "../css/Infobox.css";
import type { ProviderSummary } from "../models/Education";

type InfoBoxProps = {
  education: {
    program: string;
    credits: number | string;
    location: string;
    pace: number | string;
    website?: string | null;
    identifier?: string | null;
  };
  providerSummary?: ProviderSummary;
};

export const InfoBox = ({ education, providerSummary }: InfoBoxProps) => {
  const navigate = useNavigate();
  const { program, credits, location, pace, website } = education;

  const handleRelatedJobs = () => {
    const searchTerm = program.replace(/\s+/g, "-");
    navigate(`/jobs?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <aside className="info-box">
      <h4>Snabbfakta</h4>
      <ul>
        <li>
          <strong>Program:</strong> {program}
        </li>
        <li>
          <strong>Högskolepoäng:</strong> {credits}
        </li>
        <li>
          <strong>Plats:</strong> {providerSummary?.providers}
        </li>
        <li>
          <strong>Studietakt:</strong> {pace} %
        </li>
      </ul>
      <div className="actions">
        <button className="btn secondary" onClick={handleRelatedJobs}>
          Se relaterade yrken
        </button>
        {website ? (
          <a
            className="btn primary"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Besök webbplats
          </a>
        ) : (
          <button className="btn primary disabled" disabled>
            Besök webbplats
          </button>
        )}
      </div>
    </aside>
  );
};
