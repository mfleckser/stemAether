import './Welcome.css';
import { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { checkoutRoom } from "../data.js"
import { collection, getDocs } from "firebase/firestore"

function ActualCheckin() {
    let { roomNum } = useParams();
    useEffect(() => {
        checkoutRoom(roomNum);
    });
    
    let history = useHistory();

  return (
    <div>

    </div>
  );
}

export default ActualCheckin;