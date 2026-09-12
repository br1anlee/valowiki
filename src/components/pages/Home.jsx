import { Link } from "react-router-dom";
import "../layout/Home.css";
import ValoVid from "../video/home-bg.mp4";

export default function Home() {
  return (
    <>
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={ValoVid} type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <span className="eyebrow">Your Valorant Companion</span>
          <h1 className="hero-title">Valowiki</h1>
          <p className="hero-lead">
            Everything you need on agents, maps and weapons - pulled live from
            the Valorant API, so it never goes stale.
          </p>
          <div className="hero-actions">
            <Link to="/agents" className="btn btn-primary">
              Browse Agents
            </Link>
            <Link to="/lineups" className="btn">
              Learn Line Ups
            </Link>
          </div>
        </div>
      </section>

      <div className="page">
        <div className="home-cards">
          <Link to="/agents" className="card home-card">
            <h3>Agents</h3>
            <p>
              Every playable agent, grouped by role, with full ability
              breakdowns.
            </p>
            <span className="home-card-cta">View agents</span>
          </Link>
          <Link to="/maps" className="card home-card">
            <h3>Maps</h3>
            <p>The standard rotation, with callout layouts and site counts.</p>
            <span className="home-card-cta">View maps</span>
          </Link>
          <Link to="/weapons" className="card home-card">
            <h3>Weapons</h3>
            <p>Stats, prices and the full skin catalogue for every weapon.</p>
            <span className="home-card-cta">View weapons</span>
          </Link>
        </div>

        <section className="home-about">
          <h2 className="section-title">About</h2>
          <p>
            Valowiki is built for Valorant players who want to learn more about
            their favourite agents and improve their gameplay.{" "}
            <a
              href="https://playvalorant.com/en-us/"
              target="_blank"
              rel="noreferrer"
            >
              VALORANT
            </a>{" "}
            is a free-to-play competitive 5v5 character-based tactical shooter
            developed by Riot Games. Set in a near-future Earth, you team up
            with four other players against five enemies in round-based combat
            with an agent of your choice. Creativity is your greatest weapon.
          </p>
          <p>
            Want to see it in action? Watch some{" "}
            <Link to="/gameplay">gameplay</Link>.
          </p>
        </section>

        <p className="disclaimer">
          Valowiki isn't endorsed by Riot Games and doesn't reflect the views or
          opinions of Riot Games or anyone officially involved in producing or
          managing Riot Games properties. Riot Games, and all associated
          properties are trademarks or registered trademarks of Riot Games, Inc.
        </p>
      </div>
    </>
  );
}
