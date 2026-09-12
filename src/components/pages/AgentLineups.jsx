import { Navigate, useParams } from "react-router-dom";
import LineupGallery from "../layout/LineupGallery";
import "../layout/Lineup-page.css";
import { getAgent, lineupsFor } from "../../data/lineups";

// Serves /lineups/sova, /lineups/cypher and any agent added to the data file.
export default function AgentLineups() {
  const { agent: slug } = useParams();
  const agent = getAgent(slug);

  // Unknown agent falls through to the 404 page.
  if (!agent) return <Navigate to="/nonexistent" replace />;

  const lineups = lineupsFor(slug);

  return (
    <div className="page">
      <img className="image-gif" src={agent.banner} alt={agent.name} />

      <header className="page-head">
        <span className="eyebrow">Line Ups</span>
        <h1>{agent.name}</h1>
        <p>{agent.blurb}</p>
      </header>

      <LineupGallery lineups={lineups} label={agent.name} />
    </div>
  );
}
