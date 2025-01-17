import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import WeaponDetails from "./WeaponDetails"

export default function Weapon() {
   const { id } = useParams()
   const [weaponData, setWeaponData] = useState([])
   const [weaponStats, setWeaponStats] = useState([])
   const [weaponShop, setWeaponShop] = useState([])
   const [weaponSkins, setWeaponSkins] = useState([])

   useEffect(() => {
      axios
         .get(`https://valorant-api.com/v1/weapons/${id}`)
         .then((response) => {
            setWeaponData(response.data.data)
            setWeaponStats(response.data.data.weaponStats)
            setWeaponShop(response.data.data.shopData)
            setWeaponSkins(response.data.data.skins)
         })
         .catch(console.log)
   }, [id])

   return (
      <div className="background-color">
         <WeaponDetails weaponData={weaponData} weaponStats={weaponStats} weaponShop={weaponShop} weaponSkins={weaponSkins}/>
      </div>
   )
}
