import { Link } from "react-router-dom";
import "../layout/Agent.css";
import { useState, useEffect } from "react";

export default function Agents({ agents }) {
   const itemsPerRow = 4
  const agentList = agents.map((agent, i) => {
    return (
      // <div key={`key-${i}`} className="agent-list-container">
      //   <div>
      //     <Link to={`/agents/${agent.uuid}`}>
      //       <img
      //         className="agent-icon"
      //         src={agent.displayIconSmall}
      //         alt="agent icon"
      //       />
      //     </Link>
      //     <div>
      //       <h4>
      //         <b>
      //           <Link to={`/agents/${agent.uuid}`}>{agent.displayName}</Link>
      //         </b>
      //       </h4>
      //       <p>{agent.role.displayName}</p>
      //     </div>
      //   </div>
      // </div>
      <div key={`key-${i}`} className="agent-item">
         <Link to={`/agents/${agent.uuid}`}>
            <img src={agent.displayIconSmall} alt="Agent icon" className="agent-icon"/>
         </Link>
         <div>
            <h4>
               <strong>
                  <Link to={`/agents/${agent.uuid}`}>{agent.displayName}</Link>
               </strong>
            </h4>
            <p>{agent.role.displayName}</p>
         </div>
      </div>
    );
  });

  const agentRows = [];
  for (let i = 0; i < agentList.length; i += itemsPerRow){
   const rowItems = agentList.slice(i, i + itemsPerRow);
   agentRows.push(
      <div key={`row-${i}`} className="agent-row">
         {rowItems}
      </div>
   )
  }
  return (
    <>
      <img
        className="header-img"
        src="https://wallpapercave.com/dwp1x/wp8723098.jpg"
        alt="picture of agents"
      />
      <h1 className="center roles-title">Roles</h1>
      <div className="agent-container">
        <section className="role-description">
          <h3 className="role-name">Initiators</h3>
          <p>
            Initiators “challenge angles by setting up their team to enter
            contested ground and push defenders away.” These agents often excel
            on the offensive, setting up their teammates for success. Breach,
            KAY/O, and Skye offer flashes or stuns in one form or another, while
            Sova provides vision.
          </p>
        </section>

        <section className="role-description">
          <h3 className="role-name">Duelist</h3>
          <p>
            Duelists are “self-sufficient fraggers. They are the agents that
            create some of the most impact, offering aggression to a team
            composition. A Duelist should be expected to seek out engagements
            and frag, may that be finding the opening pick or clutching out a
            round.
          </p>
        </section>

        <section className="role-description">
          <h3 className="role-name">Sentinels</h3>
          <p>
            Sentinels are “defensive experts who can lock down areas and watch
            flanks, both on attack and defender rounds.” In a game dedicated to
            planting or defusing the Spike, these agents are crucial. Chamber,
            Cypher, and Killjoy hold down sites with their gizmos and gadgets,
            while Sage puts a stop to pushes and rotations with slows and
            barricades.
          </p>
        </section>

        <section className="role-description">
          <h3 className="role-name">Controllers</h3>
          <p>
            Controllers are experts in “slicing up dangerous territory to set
            their team up for success." This usually comes in the form of
            smokes, which can be used to offensively or defensively block off a
            target's vision but also slows, stuns, and in some cases, flashes.
            Some examples of controllers are Brimstone, Astra, Harbor and Omen.
          </p>
        </section>
      </div>
      <h1 className="agent-list">List of Agents</h1>
      <div className="agent-list-container">{agentRows}</div>
    </>
  );
}
