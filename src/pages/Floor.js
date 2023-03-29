import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header.js'
import { useState, useEffect } from 'react'
import { getRoomData } from '../data.js'
import { firebase, deletePerson } from '../data.js'
import { Button, TextField, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { AddCircleOutlineRounded, DeleteOutlineRounded, Edit } from '@material-ui/icons';

import "./floor.css"
// import GridLayout from 'react-grid-layout'




const Floor = ({user}) => {
    let { floorNum } = useParams();
    const [roomData, setRoomData] = useState([]);
    const possibleRemovedValue = user.displayName;

   


  useEffect(() => {
    console.log('useEffect Hook!!!');
    const collectionNames = ["GFloor", "1stFloor", "2ndFloor", "LAL"];
    firebase.firestore().collection(collectionNames[floorNum]).onSnapshot(snapshot => {
      console.log('Firebase Snap!');
      setRoomData(snapshot.docs.map(doc => {
        if (doc.data().people.length > 0) {
          const currentTime = Date.now()
          for(let i = 0; i < doc.data().people.length; i++) {
            if(currentTime - doc.data().people[i].time > 45 * 60 * 1000) {
              deletePerson(floorNum, doc.id, possibleRemovedValue)
            }
          }
        return {
          id: doc.id,
          occupied: doc.data().occupied,
          people: doc.data().people
        }

      } else {
        return {
          id: doc.id,
          occupied: false,
          people: doc.data().people
        }
      }
        
      }))
    })

  }, []);



  



  if (user.email.includes("@dasd.org") || user.email === "help.stemaether@gmail.com") {
    return (
      <div className="grid" id="wholePage">
          <Header/>
          <div className = "dashboardHeader_left">
        <br/>
        <br/>
        <br/>
        <br/>
        
      </div>
          <span id="floorNum">Floor: {floorNum}</span>

    {/*<List dense={true}>*/}
          {
            roomData.map(roomDat => (
              <div key={roomDat.id} className="roomItem">
            
                <span className="roomTitle">{"Room" + " " + roomDat.id + " " + "is" + " " + (roomDat.occupied ? "occupied" : "unoccupied")}</span>
                <div className="peopleList">{"People in Room: "}
                <div>{roomDat.people.map(person => {
                  return <span key={person.name} className="personName">{person.name}</span>
                })}</div>
                

                </div>
                <button 
                disabled={!roomDat.people.map(person => person.name).includes(user.displayName)}
                onClick={() => deletePerson(floorNum, roomDat.id, possibleRemovedValue)} className="checkOutButton">Check Out</button>
              </div>
            ))
          }
    {/*</List>*/}


         


      </div>
  )} else {
    return (
      <div id="wholePage">
          <Header/>
          <div className = "dashboardHeader_left">
        <br/>
        <br/>
        <br/>
        <br/>
        
      </div>


          <span id="floorNum">Floor: {floorNum}</span>

    {/*<List dense={true}>*/}
          {
            roomData.map(roomDat => (
              // <GridLayout className="layout" cols={10} rowHeight={25} width={900}>

              <div key={roomDat.id} className="roomItem">
            
                <span className="roomTitle">{"Room" + " " + roomDat.id + " " + "is" + " " + (roomDat.people.length > 1 ? "occupied" : "unoccupied")}</span>
                <div className="peopleList">{"Number of People in Room: " + roomDat.people.length}
                </div>
                <button 
                disabled={!roomDat.people.map(person => person.name).includes(user.displayName)}
                onClick={() => deletePerson(floorNum, roomDat.id, possibleRemovedValue)} className="checkOutButton">Check Out
                </button>
              </div>
              // </GridLayout>
            ))
          }
    {/*</List>*/}
      </div>
  )
  }

}

export default Floor;