import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header.js'
import { useState, useEffect } from 'react'
import { getRoomData } from '../data.js'
import { firebase } from '../data.js'
import { Button, TextField, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions } from '@material-ui/core';



const Floor = () => {
    let { floorNum } = useParams();
    const [roomData, setRoomData] = useState([]);


  useEffect(() => {
    console.log('useEffect Hook!!!');
    const collectionNames = ["GFloor", "1stFloor", "2ndFloor"];
    firebase.firestore().collection(collectionNames[floorNum]).onSnapshot(snapshot => {
      console.log('Firebase Snap!');
      setRoomData(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          occupied: doc.data().occupied,
          peopleNames: doc.data().peopleNames
        }
      }))
    })

  }, []);







    return (
        <div>
            <Header/>
            <div className = "dashboardHeader_left">
          <br/>
          <br/>
          <br/>
          <br/>
          
        </div>
            Floor: {floorNum}

      <List dense={true}>
            {
              roomData.map(roomDat => (

                <ListItem key={roomDat.id} >

                  <ListItemText
                    primary={"Room" + " " + roomDat.id + " " + "is" + " " + (roomDat.occupied ? "occupied" : "unoccupied")}
                    secondary={"People in Room: " + roomDat.peopleNames}
                  />

                </ListItem>
              ))
            }
      </List>


           


        </div>
    )
}

export default Floor;