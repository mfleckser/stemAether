import './Welcome.css';
import { useState } from 'react'
import { useParams } from "react-router-dom"
import { checkoutRoom, occupyRoom} from "../data.js"
import { collection, getDocs } from "firebase/firestore"
import { useHistory } from "react-router-dom"
import GFloor from "./GFloor"


function Checkin({user}) {
    let { roomNum } = useParams();
    let history = useHistory();

    const [floorNum, setFloorNum] = useState("1stFloor");


    const setRoom = () => {
      // checkoutRoom(floorNum, roomNum, user.displayName);
    }

    const actuallySetRoom = () => {
      occupyRoom(floorNum, roomNum, user.displayName);
    }

  return (
    <div>
    
        Room #: {roomNum}
        <button onClick={actuallySetRoom}>Occupy room</button>

    </div>
  );
}

export default Checkin;
