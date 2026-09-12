import "../layout/Weapons.css"

// "EWallPenetrationDisplayType::Medium" -> "Medium"
const enumLabel = (value) =>
   typeof value === "string" ? value.split("::").pop() : value

export default function WeaponDetails({ weaponData, weaponStats, weaponShop, weaponSkins }) {
   // Melee ships without shopData or weaponStats, and everything is empty on
   // the first render, so every figure below is built defensively.
   const stats = []

   if (weaponShop?.categoryText) {
      stats.push({ label: "Category", value: weaponShop.categoryText })
   }
   if (weaponShop?.cost != null) {
      stats.push({ label: "Cost", value: `${weaponShop.cost}`, unit: "creds" })
   }
   if (weaponStats?.fireRate) {
      stats.push({ label: "Fire rate", value: weaponStats.fireRate, unit: "/sec" })
   }
   if (weaponStats?.magazineSize) {
      stats.push({ label: "Magazine", value: weaponStats.magazineSize, unit: "rounds" })
   }
   if (weaponStats?.reloadTimeSeconds) {
      stats.push({ label: "Reload", value: weaponStats.reloadTimeSeconds, unit: "sec" })
   }
   if (weaponStats?.equipTimeSeconds) {
      stats.push({ label: "Equip", value: weaponStats.equipTimeSeconds, unit: "sec" })
   }
   if (weaponStats?.wallPenetration) {
      stats.push({ label: "Wall pen", value: enumLabel(weaponStats.wallPenetration) })
   }
   if (weaponStats?.runSpeedMultiplier) {
      stats.push({ label: "Run speed", value: `${weaponStats.runSpeedMultiplier}x` })
   }

   const skinList = (weaponSkins || []).map((skin, idx) => {
      const render = skin.chromas?.[0]?.fullRender
      if (!render) return null

      return (
         <div key={`skin-${idx}`}>
            <h3>{skin.displayName}</h3>
            <img src={render} alt={skin.displayName} className="weapon-skin-image" loading="lazy" />
         </div>
      )
   })

   return (
      <div className="page">
         <header className="page-head">
            <span className="eyebrow">Weapon</span>
            <h1>{weaponData?.displayName}</h1>
         </header>

         <section className="weapon-hero">
            <div className="weapon-hero-art">
               {weaponData?.displayIcon && (
                  <img
                     className="wep-image"
                     src={weaponData.displayIcon}
                     alt={weaponData.displayName}
                  />
               )}
            </div>

            {stats.length > 0 && (
               <div className="weapon-hero-stats">
                  <dl>
                     {stats.map((stat) => (
                        <div key={stat.label}>
                           <dt>{stat.label}</dt>
                           <dd>
                              {stat.value}
                              {stat.unit && <span>{stat.unit}</span>}
                           </dd>
                        </div>
                     ))}
                  </dl>
               </div>
            )}
         </section>

         <h2 className="section-title">Skins</h2>
         <div className="skins-container">{skinList}</div>
      </div>
   )
}
