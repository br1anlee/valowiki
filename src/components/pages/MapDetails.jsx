export default function MapDetails({ mapData }) {
   return (
      <>
         <section className="center">
            <h1>{mapData.displayName}</h1>
            <img src={mapData.splash} alt={mapData.displayName} />
            <img src={mapData.displayIcon} alt={mapData.displayName} />
         </section>
      </>
   )
}