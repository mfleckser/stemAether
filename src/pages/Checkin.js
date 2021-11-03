import './Welcome.css';
import { useState } from 'react'
import { useParams } from "react-router-dom"
import { db } from "../data.js"
import { collection, getDocs } from "firebase/firestore"

function Checkin() {
    let { roomNum } = useParams();

    const setRoom = () => {
        alert("Test");
    }

  return (
    <div>
    
        Room #: {roomNum}
        <button onClick={setRoom}>Do the thing</button>

    </div>
  );
}

export default Checkin;
