import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import "../layout/Maps.css"
import { playableMaps, mapSlug } from "../../utils/valorant"

export default function Maps({ gameMaps }) {
   const { hash } = useLocation()
   const maps = playableMaps(gameMaps)

   // The sidebar links here as /maps#ascent. React Router doesn't scroll to a
   // hash on its own, and the maps arrive after the first render, so this
   // re-runs once the list is populated.
   useEffect(() => {
      if (!hash) return

      const section = document.getElementById(hash.slice(1))
      if (!section) return

      let cancelled = false
      const scrollToSection = () => {
         if (!cancelled) section.scrollIntoView({ behavior: "smooth", block: "start" })
      }

      // Splash art finishes loading after mount and resizes everything above
      // the target, so scroll once now and again once the images have settled -
      // otherwise the first scroll lands on a stale offset.
      const frame = requestAnimationFrame(scrollToSection)
      const pending = Array.from(
         document.querySelectorAll(".map-card-art img")
      ).filter((img) => !img.complete)

      Promise.all(
         pending.map(
            (img) =>
               new Promise((resolve) => {
                  img.addEventListener("load", resolve, { once: true })
                  img.addEventListener("error", resolve, { once: true })
               })
         )
      ).then(scrollToSection)

      return () => {
         cancelled = true
         cancelAnimationFrame(frame)
      }
   }, [hash, maps.length])

   return (
      <div className="page">
         <header className="page-head">
            <span className="eyebrow">Valowiki</span>
            <h1>Maps</h1>
            <p>{maps.length} maps in the standard rotation</p>
         </header>

         <div className="map-grid">
            {maps.map((map) => (
               <section
                  key={map.uuid}
                  id={mapSlug(map.displayName)}
                  className="card map-card"
               >
                  <div className="map-card-art">
                     <img src={map.splash} alt={map.displayName} loading="lazy" />
                  </div>
                  <div className="map-card-body">
                     <h3>{map.displayName}</h3>
                     <span className="map-card-sites">{map.tacticalDescription}</span>
                     {map.coordinates && (
                        <span className="map-card-coords">{map.coordinates}</span>
                     )}
                  </div>
               </section>
            ))}
         </div>
      </div>
   )
}
