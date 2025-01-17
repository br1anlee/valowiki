import './App.css';
import {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import Home from './components/pages/Home';
import Maps from './components/pages/Maps';
import Agents from './components/pages/Agents';
import axios from 'axios'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Agent from './components/pages/Agent';
import Weapons from './components/pages/Weapons';
import Weapon from './components/pages/Weapon';
import Lineups from './components/pages/Lineups';
import Sova from './components/pages/Sova';
import Cypher from './components/pages/Cypher';
import Contact from './components/pages/Contact';
import Gameplay from './components/pages/Gameplay';
import PageNotFound from './components/pages/PageNotFound';

function App() {
  
  // Declaring states
  const [agents, setAgents] = useState([])
  const [gameMaps, setGameMaps] = useState([])
  const [weapons, setWeapons] = useState([])

  // useEffect to get agent data from the Valorant API
useEffect(() => {
  axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
    .then((response) => {
      setAgents(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
}, [] )

// useEffect to get map data from the Valorant API
useEffect(() => {
  axios.get('https://valorant-api.com/v1/maps')
    .then((response) => {
      setGameMaps(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
}, [] )

// useEffect to get weapons data from the Valorant API
useEffect(() => {
  axios.get('https://valorant-api.com/v1/weapons')
    .then((response) => {
      setWeapons(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
}, [] )

  return (
    <Router>
      <Navbar />
      <Routes>

        <Route 
          path = '/'
          element = {<Home />}
        />

        <Route 
          path = '/maps'
          element = {<Maps gameMaps={gameMaps}/>}
        />

        <Route 
          path = '/agents'
          element = {<Agents agents={agents}/>}
        />

        <Route 
          path = '/agents/:id'
          element ={<Agent />}
        />

        <Route 
          path = '/weapons'
          element ={<Weapons weapons={weapons} />}
        />

        <Route 
          path = '/weapons/:id'
          element ={<Weapon />}
        />

        <Route 
          path='/lineups'
          element={<Lineups />}
        />

        <Route 
          path='/lineups/sova'
          element={<Sova />}
        />

        <Route 
          path='/lineups/cypher'
          element={<Cypher />}
        />

        <Route 
          path='/team'
          element={<Contact />}
        />
        
        <Route
          path='/gameplay'
          element={<Gameplay />}
        />
            
        <Route
          path='*'
          element={<PageNotFound />}  
        />

      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
