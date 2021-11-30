
import React from 'react'
import Canvas from '../components/FloorMap'
import './Dashboard.css';
import { useHistory } from "react-router-dom"
import { auth, signInWithEmailAndPassword, signInWithGoogle, logout } from "../data"
import Welcome from './Welcome';
import Header from '../components/Header'
import 'bulma/css/bulma.min.css';
import HomeIcon from "@material-ui/icons/Home"

function App({ user }) {
  let history = useHistory();
  const handleSignOut = () => {
    logout();
    history.replace(<Welcome/>);
  }

  return (
    <div>
  <Header/>
  <div className = "dashboardHeader_left">
    <br/>
    <br/>
    <br/>
    <br/>
    <center>
  <h1>Hello, {user.displayName}</h1>
  </center>
  {/* <img className = "img_fit" src={user.photoURL} alt="" /> */}
  {/* <HomeIcon/> */}
  <button class="button is-dark" onClick={handleSignOut}>Sign out</button>
  </div>
  <Canvas floor="G"/>
  </div>
);
}

export default App