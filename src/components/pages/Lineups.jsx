import { Link } from "react-router-dom"
import "../layout/Lineup-page.css";

export default function Lineups() {
   return (
      <>
         <div>
            <h1 className="center">Lineups</h1>
            <img className="image-gif" src="https://media.giphy.com/media/Z5HVfEvnxr67u/giphy.gif" alt="lineup gif" />
         </div>
         <div className="center container">
            <div className="border-p">
               <h3>What are Lineups and Setups?</h3>
               <p>
                  Line ups are when you align your crosshair or other HUD (Heads up Display) elements
                  within the environment in order to shoot/throw an agent's ability to land in a
                  desired location. It is generally done while out of harms way to kil and/or displace
                  the enemy team to give you and your team an advantage.
               </p>
               <h3>Go checkout our lineups/setups! You will be a pro in no time!</h3>
            </div>

            <img src="https://media3.giphy.com/media/MYDaNeVL10SoYi8kHj/giphy.gif?cid=790b76113d084d1d46a38a292a68ce07a04f1b83f34bf5b1&rid=giphy.gif&ct=g" alt="" />
            <div style={{ margin: 30 }}>
               <h2><Link to="/lineups/sova">Sova Lineups</Link></h2>
               <h2><Link to="/lineups/cypher">Cypher Setups</Link></h2>
            </div>
            
         </div>
      </>
   )
}
