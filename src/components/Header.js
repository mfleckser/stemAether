import React, { useState } from "react"
import { slide as Menu } from 'react-burger-menu'
import { useHistory } from "react-router-dom"
import './Header.css'
import Welcome from '../pages/Welcome';
import { auth, signInWithEmailAndPassword, signInWithGoogle, logout } from "../data"
import 'bulma/css/bulma.min.css';




function Header() {
    let history = useHistory();
    const handleSignOut = () => {
        logout();
        history.replace(<Welcome/>);
      }

    return (
        <div className="hamburger_menu">
        <Menu classname={"bars"} left>
            <h1 className = "sidebar_title">STEM <span>AETHER</span></h1>
            <hr className = "horizontal_line"/>


            <a className="menu-item" href="/">
            Home
          </a>
          <a className="menu-item" href="/contact">
            Help & Support
          </a>
          {/* <hr className = "horizontal_line"/> */}
          <a className="menu-item" href="/about">
            About
          </a>
          <hr className = "horizontal_line"/>
          <center>
          <button className = "buttonSignOut" onClick={handleSignOut}>Sign out</button>
          </center>
        </Menu>
      </div>
    )
}

export default Header
