import './Welcome.css';
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { occupyRoom} from "../data.js"
import { collection, getDocs } from "firebase/firestore"
import { useHistory } from "react-router-dom"
import GFloor from "./GFloor"
import Header from '../components/Header'
import Dashboard from './Dashboard'



function Checkin({user}) {
    let { roomNum } = useParams();
    let history = useHistory();
    const [floorNum, setFloorNum] = useState("2ndFloor");



  useEffect(() => {
    console.log("What is roomNum" + roomNum)
    if (roomNum.charAt(0) == "G") {
      setFloorNum("GFloor")
    } else if (roomNum.charAt(0) == "1"){
      setFloorNum("1stFloor")
    } else {
      setFloorNum("2ndFloor")
    }
    
  }, [])

  
    const setRoom = () => {
      
      occupyRoom(floorNum, roomNum, user.displayName);
      history.replace("/")
      console.log("function called")
    }

  return (
    <div>
        <Header/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
       <center><h1 className="titleSTEM">Room #: {roomNum} </h1></center>
        <button className = "buttonSignIn" onClick={setRoom}>Occupy room</button>

    </div>
  );
}

export default Checkin;
