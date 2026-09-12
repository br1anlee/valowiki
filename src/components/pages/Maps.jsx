import { Link } from "react-router-dom"
import "../layout/Maps.css"
import { playableMaps } from "../../utils/valorant"

export default function Maps({ gameMaps }) {
   const maps = playableMaps(gameMaps)

   return (
      <div className="page">
         <header className="page-head">
            <span className="eyebrow">Valowiki</span>
            <h1>Maps</h1>
            <p>{maps.length} maps in the standard rotation</p>
         </header>

         <div className="map-grid">
            {maps.map((map) => (
               <Link
                  key={map.uuid}
                  to={`/maps/${map.uuid}`}
                  className="card map-card"
               >
                  <div className="map-card-art">
                     <img src={map.splash} alt={map.displayName} loading="lazy" />
                  </div>
                  <div className="map-card-body">
                     <h3>{map.displayName}</h3>
                     <span className="map-card-sites">{map.tacticalDescription}</span>
                     {map.callouts?.length > 0 && (
                        <span className="map-card-coords">
                           {map.callouts.length} callouts
                        </span>
                     )}
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}
