import { useNavigate } from "react-router";
import "../css/Infobox.css";

type InfoBoxProps = {
  education: {
    program: string;
    credits: number | string;
    location: string;
    pace: number | string;
    website?: string | null;
  };
};

export const InfoBox = ({ education }: InfoBoxProps) => {
  const navigate = useNavigate();
  const { program, credits, location, pace, website } = education;

  const handleRelatedJobs = () => {
    navigate(`/jobs?query=${encodeURIComponent(program)}`);
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
          <strong>Plats:</strong> {location}
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
