import "../layout/Concept.css";
import { CONCEPT } from "../../data/concept";

export default function Concept() {
  const agent = CONCEPT;

  return (
    <div className="page">
      {/* Rendered while the file still holds template content, so the page can
          never be mistaken for a finished design. */}
      {agent.isPlaceholder && (
        <p className="concept-placeholder">
          <strong>Template.</strong> The kit below is placeholder content.
          Replace it in <code>src/data/concept.js</code> with your own design.
        </p>
      )}

      <header className="page-head">
        <span className="eyebrow">Agent concept</span>
        <h1>{agent.name}</h1>
        <p className="concept-tagline">{agent.tagline}</p>
        <div className="concept-meta">
          <span className="lineup-tag is-map">{agent.role}</span>
          <span className="lineup-tag">{agent.origin}</span>
        </div>
      </header>

      <section className="concept-bio">
        <p>{agent.bio}</p>
      </section>

      <h2 className="section-title">Kit</h2>
      <div className="concept-kit">
        {agent.abilities.map((ability) => (
          <article className="card concept-ability" key={ability.slot}>
            <header>
              <span className="concept-slot">{ability.slot}</span>
              <div>
                <h3>{ability.name}</h3>
                <span className="concept-cost">
                  {ability.cost} · {ability.charges}
                </span>
              </div>
            </header>
            <p>{ability.description}</p>
            {ability.designNote && (
              <p className="concept-note">
                <span>Design note</span>
                {ability.designNote}
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="concept-columns">
        <section>
          <h2 className="section-title">Counterplay</h2>
          <ul className="concept-list">
            {agent.counterplay.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="section-title">Design notes</h2>
          <ul className="concept-list">
            {agent.designNotes.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
