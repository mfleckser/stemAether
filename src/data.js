import firebase from "firebase";
import { doc, getDoc } from "firebase/firestore"
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import { user } from './App.js'

const firebaseConfig = {
    apiKey: "AIzaSyBXDwRwO0_Lnk8SXgvcG9TVaE7RMIeStwA",
    authDomain: "stem-aether.firebaseapp.com",
    databaseURL: "https://stem-aether-default-rtdb.firebaseio.com",
    projectId: "stem-aether",
    storageBucket: "stem-aether.appspot.com",
    messagingSenderId: "147898812728",
    appId: "1:147898812728:web:779aa43159105aaa5819cd"
  };

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  auth.signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
};



const occupyRoom = async (floorNum, roomNum, displayName) => {
  const rooms = await getRoomData(floorNum)
  if(rooms.contains(roomNum)) {
    db.collection(floorNum).doc(roomNum).set({
      occupied: true,
      people: firebase.firestore.FieldValue.arrayUnion({
        name: displayName,
        time: Date.now()
      })
    },
    { merge: true }
    )
  }
}

const getRoomData = async (floorNum) => {
  const collectionNames = ["GFloor", "1stFloor", "2ndFloor", "LAL"];
  const res = await db.collection(collectionNames[floorNum]).get().then(querySnapshot => {
    const data = querySnapshot.docs.map(doc => doc.data());
    console.log(data); // LA city object with key-value pair
    return data;
  });
}


const deletePerson = async (floorNum, roomId, name) => {
  const collectionNames = ["GFloor", "1stFloor", "2ndFloor", "LAL"];
  const res = await db.collection(collectionNames[floorNum]).doc(roomId).get()
  const peopleData = res.data()
  const newData = {...peopleData}
  console.log(newData)
  db.collection(collectionNames[floorNum]).doc(roomId).set({
    people: peopleData.people.filter(person => person.name !== name),
    occupied: peopleData.people.length > 1
  }).catch(function(error) {
    console.error(error)
  })
}



export {
  auth,
  db,
  signInWithGoogle,
  logout,
  occupyRoom,
  getRoomData,
  deletePerson,
  firebase
};