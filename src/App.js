import './App.css';
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Welcome from './pages/Welcome.js'
import Checkin from './pages/Checkin.js'
import Dashboard from './pages/Dashboard.js'

import { auth } from "./data"


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])
  
  const [collabRoom, setCollabRoom] = useState(0)

  return (
    <Router>
      <div className = "app">
        <Switch>
        
          <Route exact path="/">
            <Welcome />
          </Route>

          <Route exact path = "/dashboard">
            <Dashboard user = {user} /> 
          </Route>

          <Route path="/checkin/:roomNum">
            <Checkin />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
