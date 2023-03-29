import './App.css';
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Welcome from './pages/Welcome.js'
import Settings from './pages/Settings.js'
import About from './pages/About.js'
import Contact from './pages/Contact.js'
import Checkin from './pages/Checkin.js'
import GFloor from './pages/GFloor.js'
import SecondFloor from './pages/SecondFloor.js'
import FirstFloor from './pages/FirstFloor.js'
import Floor from './pages/Floor.js'
import Login from './pages/Login.js'
import { useHistory } from "react-router-dom"





import Dashboard from './pages/Dashboard.js'
import 'bulma/css/bulma.min.css';
import { auth } from "./data"


function App() {
  let history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
      console.log(user)
    })


    
    
  }, [])
  
  const [collabRoom, setCollabRoom] = useState(0)

  
  

  

  

    return (
      <Router>
        <div className = "app">
        {!user ? (
          <Switch>
            <Route exact path="/">
              <Welcome/>
            </Route>
            <Route exact path="/checkin/:roomNum">
                  <Login/>
              </Route>
          </Switch>
        ): (
          <Switch>
          
            <Route exact path="/">
              <Dashboard user = {user} />
            </Route>

            <Route path="/checkin/:roomNum">
              <Checkin user = {user} />
            </Route>
            
            <Route exact path="/settings">
              <Settings />
            </Route>
  
            <Route exact path="/about">
              <About user = {user} />
            </Route>
  
            <Route exact path="/contact">
              <Contact user = {user}/>
            </Route>
  
            <Route exact path="/floor/:floorNum">
              <Floor user = {user}/>
            </Route>
            {/*<Route exact path="/ground">
              <GFloor user = {user}/>
            </Route>
  
            <Route exact path="/firstFloor">
              <FirstFloor user = {user}/>
            </Route>
            
            <Route exact path="/secondFloor">
        <SecondFloor user = {user}/>
        </Route>*/}
  
  
          </Switch>
        )}
        </div>
      </Router>
    );
  // } else {
  //   return <Welcome/>
  // }
 
}

export default App;
