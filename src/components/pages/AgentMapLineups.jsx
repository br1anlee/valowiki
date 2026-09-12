import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "../layout/Lineup-page.css";
import LineupEntry from "../layout/LineupEntry";
import { getAgent, lineupsOn, mapsFor, roleOn } from "../../data/lineups";

// "I am Sova on Ascent" - the page the whole section is built around. Leads
// with what your job is here, then the line ups that prove it.
export default function AgentMapLineups() {
  const { agent: slug, map: mapParam } = useParams();
  const [openId, setOpenId] = useState(null);

  const agent = getAgent(slug);
  if (!agent) return <Navigate to="/nonexistent" replace />;

  // The URL carries a lowercase slug; recover the catalogue's spelling.
  const known = mapsFor(slug).find(
    (entry) => entry.map.toLowerCase() === String(mapParam).toLowerCase()
  );
  if (!known) return <Navigate to={`/lineups/${slug}`} replace />;

  const map = known.map;
  const lineups = lineupsOn(slug, map);
  const role = roleOn(slug, map);
  const documented = lineups.filter((l) => l.denies).length;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">
          <Link to={`/lineups/${slug}`}>{agent.name}</Link>
        </span>
        <h1>
          {agent.name} on {map}
        </h1>
        <p>
          {lineups.length} line {lineups.length === 1 ? "up" : "ups"} ·{" "}
          {agent.role}
        </p>
      </header>

      {/* The "how am I useful here" answer, before any execution detail. */}
      <section className="role-brief">
        <article>
          <h2>Your job on attack</h2>
          <p className={role?.attack ? undefined : "is-blank"}>
            {role?.attack || "Not written yet."}
          </p>
        </article>
        <article>
          <h2>Your job on defence</h2>
          <p className={role?.defence ? undefined : "is-blank"}>
            {role?.defence || "Not written yet."}
          </p>
        </article>
      </section>

      <h2 className="section-title">
        Line ups <small>{lineups.length}</small>
      </h2>

      {documented === 0 && (
        <p className="lineup-note">
          These are ordered alphabetically for now. Give entries a{" "}
          <code>priority</code> in <code>src/data/lineups.js</code> to set the
          order a new player should learn them in.
        </p>
      )}

      <ol className="lineup-list">
        {lineups.map((lineup, index) => (
          <LineupEntry
            key={lineup.id}
            lineup={lineup}
            index={index}
            agentName={agent.name}
            isOpen={openId === lineup.id}
            onToggle={() =>
              setOpenId((current) => (current === lineup.id ? null : lineup.id))
            }
          />
        ))}
      </ol>

      <nav className="lineup-switch">
        <span>Other maps</span>
        <div>
          {mapsFor(slug)
            .filter((entry) => entry.map !== map)
            .map((entry) => (
              <Link
                key={entry.map}
                to={`/lineups/${slug}/${entry.map.toLowerCase()}`}
                className="chip"
              >
                {entry.map}
                <span className="chip-count">{entry.count}</span>
              </Link>
            ))}
        </div>
      </nav>
    </div>
  );
}
