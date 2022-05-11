import "../layout/Contact.css"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Contact() {
  return (
    <>
      <div className="center" src="blue-gradient.jpeg">
        <h1>Meet the coolbeans team!</h1>
        </div>
      <main className="cards-contact team-title">
        <article className="card-contact">
          <img src="images/clair.png" alt="Photo of Clair" />
          <div className="text">
            <h3>Clair Choo</h3>
            <p className="inner-text">I am a full-stack software engineer that believes every experience, good or bad, is a priceless collector’s item. My pragmatic brain gives me the patience to adjust and adapt to constantly changing processes, and keeps me curious and yearning to learn. Having worked in various industries allowed me to acquire the skills to prioritize and work efficiently, all while maintaining the high standards I set for myself. My mind keeps me motivated, my grit is what keeps me striving.</p>
            <a href="https://github.com/clairxc" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/clair-choo/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
        <article className="card-contact">
          <img src="images/sol.jpg" alt="Photo of Sol" />
          <div className="text">
            <h3>Sol Youn</h3>
            <p className="inner-text">
            A Software Developer with a background in the healthcare industry where I learned to be open-minded, resilient, and detail-oriented. I’m always ready to fearlessly spearhead the next project. Currently searching for exciting opportunities to apply my technical and communication skills.
            </p>
            <a href="https://github.com/Luflos" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/sol-youn/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
        <article className="card-contact">
          <img src="images/brian.jpg" alt="Photo of Brian" />
          <div className="text">
            <h3>Brian Lee</h3>
            <p className="inner-text">
            I am a Full Stack Web Developer based in Los Angeles who is inspired to provide creative solutions to open ended problems and driven to master his craft. With my experience in the social service industry, I am confident on how adaptable I am working under any environment while being able to provide exceptional communication and feedback to my team members.
            </p>
            <a href="https://github.com/br1anlee" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/brianjoonmolee/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
      </main>
    </>
  )
}