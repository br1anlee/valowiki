import "../layout/Footer.css"
import { Link } from "react-router-dom"

export default function Footer() {
   return (
      <div className="footer">
         <Link to="/team" className="footer-link">
            <p>coolbeans inc. {new Date().getFullYear()} ©</p>
         </Link>
      </div>
   )
}
