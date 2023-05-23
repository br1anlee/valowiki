import { Link } from "react-router-dom"
import "../layout/Maps.css"

export default function Maps({ gameMaps }) {
   const mapsList = gameMaps.map((map, idx) => {
      return (
         <section key={`map-${idx}`} className="center">
            <h1>{map.displayName}</h1>
               <img src={map.listViewIcon} alt={map.displayName} />
         </section>
      )
   })
   return (
      <>
         <h1 className="center">Maps</h1>
         <div className="maps-container">{mapsList}</div>
      </>
   )
}
