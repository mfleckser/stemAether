import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header.js'
import { useState, useEffect } from 'react'
import { getRoomData } from '../data.js'


const Floor = () => {
    let { floorNum } = useParams();
    const [roomData, setRoomData] = useState([]);

    // useEffect(() => {
    //     setRoomData(getRoomData(floorNum))
        
    //   }, [])

      const displayRoomData = async () => {
        const data = getRoomData(floorNum)
        setRoomData(data)
        console.log(data)
      }


    return (
        <div>
            <Header/>
            Floor: {floorNum}
            <button onClick={displayRoomData}>Click here for data</button>

            {roomData?<div>{roomData["occupied"]}</div> : <div>thing</div>}
           


        </div>
    )
}

export default Floor;