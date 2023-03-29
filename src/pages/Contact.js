import React from 'react'
import Header from '../components/Header'
import { useHistory } from "react-router-dom"
import Welcome from './Welcome';
import { auth, signInWithEmailAndPassword, signInWithGoogle, logout } from "../data"



function Contact({ user }) {
    let history = useHistory();
  const handleSignOut = () => {
    logout();
    console.log("Signed out")
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

        </div>
    )
}

export default Contact
