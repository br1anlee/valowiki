import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import axios from 'axios'
import Home from './components/pages/Home';
import Maps from './components/pages/Maps';
import MapDetail from './components/pages/MapDetail';
import Agents from './components/pages/Agents';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Agent from './components/pages/Agent';
import Weapons from './components/pages/Weapons';
import Compare from './components/pages/Compare';
import Weapon from './components/pages/Weapon';
import Lineups from './components/pages/Lineups';
import AgentLineups from './components/pages/AgentLineups';
import Contact from './components/pages/Contact';
import Gameplay from './components/pages/Gameplay';
import PageNotFound from './components/pages/PageNotFound';

const API = 'https://valorant-api.com/v1'

function App() {
  const [agents, setAgents] = useState([])
  const [gameMaps, setGameMaps] = useState([])
  const [weapons, setWeapons] = useState([])

  // The sidebar and the listing pages all read from these three collections,
  // so they are fetched once here and passed down.
  useEffect(() => {
    const requests = [
      ['/agents?isPlayableCharacter=true', setAgents],
      ['/maps', setGameMaps],
      ['/weapons', setWeapons],
    ]

    requests.forEach(([path, setter]) => {
      axios
        .get(`${API}${path}`)
        .then((response) => setter(response.data.data))
        .catch((error) => console.log(error))
    })
  }, [])

  return (
    <Router>
      <Sidebar agents={agents} gameMaps={gameMaps} weapons={weapons} />

      <main className="app-main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/maps' element={<Maps gameMaps={gameMaps} />} />
          <Route path='/maps/:id' element={<MapDetail gameMaps={gameMaps} />} />
          <Route path='/agents' element={<Agents agents={agents} />} />
          <Route path='/agents/:id' element={<Agent />} />
          <Route path='/weapons' element={<Weapons weapons={weapons} />} />
          <Route path='/weapons/:id' element={<Weapon />} />
          <Route path='/compare' element={<Compare weapons={weapons} />} />
          <Route path='/lineups' element={<Lineups />} />
          <Route path='/lineups/:agent' element={<AgentLineups />} />
          <Route path='/team' element={<Contact />} />
          <Route path='/gameplay' element={<Gameplay />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>

        <Footer />
      </main>
    </Router>
  );
}

export default App;
