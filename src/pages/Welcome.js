import './Welcome.css';
import { useState } from 'react'
import { Link } from "react-router-dom"
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../data"

function Welcome() {

  return(
    <div className= "wholeThing">
      <p className="welcomeTitle">Welcome To</p> 
      
      <div className="mfTitle">
        <h1 className="titleSTEM">STEM</h1>
        <h1 className="titleAE"> AETHER</h1>
      </div>
      
      
        <button className = "buttonSignIn" onClick={signInWithGoogle}>Sign In With Google</button>
      

    </div>
  );
}

export default Welcome;
