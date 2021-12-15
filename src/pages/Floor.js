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

  //   useEffect(() => {  
  //      const collectionNames = ["GFloor", "1stFloor", "2ndFloor"];
  //     firebase.firestore().collection(collectionNames[floorNum]).get().then(querySnapshot => {
  //       var floorNames = []
  //       if (!querySnapshot.empty) {
  //         querySnapshot.forEach((childSnapshot) => {
  //           var id = childSnapshot.id;
  //           var data = childSnapshot.val();
  //           floorNames.push({id: id, occupied: data.occupied, peopleNames: data.peopleNames})
  //           setRoomData(childSnapshot.data())
  //         }); 
  //         }  else{
  //           setRoomData({});
  //         }
  //     })  
  // }, [])  

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


    // const getRoomData =  (floorNum) => {
    //   const collectionNames = ["GFloor", "1stFloor", "2ndFloor"];
    //   const res = firebase.firestore().collection(collectionNames[floorNum]).get().then(querySnapshot => {
    //     const data = querySnapshot.docs.map(doc => doc.data());
    //     console.log(data); // LA city object with key-value pair
    //     return data;
    //   });
    
    // }

    // useEffect(() => {
    //     setRoomData(getRoomData(floorNum))
        
    //   }, [])

      // const displayRoomData = async () => {
      //   const data = getRoomData(floorNum)
      //   setRoomData(data)
      //   console.log(data)
      // }


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
                    primary={roomDat.occupied}
                    secondary={roomDat.peopleNames}
                  />

                </ListItem>
              ))
            }
      </List>

                                
                                        
            {/* <button onClick={displayRoomData}>Click here for data</button> */}

            {/* {roomData?<div>{roomData["occupied"]}</div> : <div>thing</div>} */}
           


        </div>
    )
}

export default Floor;