import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header.js'
import { useState, useEffect } from 'react'
import { getRoomData } from '../data.js'
import { firebase } from '../data.js'
import { Button, TextField, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { AddCircleOutlineRounded, DeleteOutlineRounded, Edit } from '@material-ui/icons';




const Floor = ({user}) => {
    let { floorNum } = useParams();
    const [roomData, setRoomData] = useState([]);
    const possibleRemovedValue = user.displayName;


  useEffect(() => {
    console.log('useEffect Hook!!!');
    const collectionNames = ["GFloor", "1stFloor", "2ndFloor"];
    firebase.firestore().collection(collectionNames[floorNum]).onSnapshot(snapshot => {
      console.log('Firebase Snap!');
      setRoomData(snapshot.docs.map(doc => {
        if (doc.data().peopleNames.length > 0) {
        return {
          id: doc.id,
          occupied: doc.data().occupied,
          peopleNames: doc.data().peopleNames
        }

      } else {
        return {
          id: doc.id,
          occupied: false,
          peopleNames: doc.data().peopleNames
        }
      }
        
      }))
    })

  }, []);



  const deletePerson = (id) => {
    const collectionNames = ["GFloor", "1stFloor", "2ndFloor"];
    firebase.firestore().collection(collectionNames[floorNum]).doc(id).update({
      peopleNames: firebase.firestore.FieldValue.arrayRemove(possibleRemovedValue)
    }).catch(function(error) {
      console.error(error)
    })
  }







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

                {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deletePerson(roomDat.id)}>
                  <DeleteOutlineRounded />
                </IconButton>
              </ListItemSecondaryAction> */}

              <button onClick={() => deletePerson(roomDat.id)}>Check Out</button>


                </ListItem>
              ))
            }
      </List>


           


        </div>
    )
}

export default Floor;