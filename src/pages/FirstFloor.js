import './Dashboard.css';
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { auth, signInWithEmailAndPassword, signInWithGoogle, logout } from "../data"
import Welcome from './Welcome';
import Header from '../components/Header'
import 'bulma/css/bulma.min.css';
import HomeIcon from "@material-ui/icons/Home"
import { getRoomData } from "../data.js"

import {
  Line,
  SteppedLine,
  PolyLine,
  Circle,
  Rectangle
} from 'draw-shape-reactjs';




function FirstFloor({ user }) {
  let history = useHistory();
  const handleSignOut = () => {
    logout();
    history.replace(<Welcome/>);
  }


  const [floorNum, setFloorNum] = useState("1stFloor");
  const [roomNum, setRoomNum] = useState(0);



  const setRoom = () => {
    getRoomData(floorNum, roomNum);
    console.log("function called")
  }


  return(
    
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

  <center>

      <h1> Room Numbers on 1st Floor </h1>
      <br/>

      <button class="button is-dark" onClick={setRoom}>Room {roomNum}</button>
  </center>


  {/* <Canvas floor="G"/> */}
    </div>
  );
}

export default FirstFloor;
