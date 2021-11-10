import './Dashboard.css';
import { useHistory } from "react-router-dom"
import { auth, signInWithEmailAndPassword, signInWithGoogle, logout } from "../data"
import Welcome from './Welcome';
import Header from '../components/Header'
import 'bulma/css/bulma.min.css';



function GFloor({ user }) {
  let history = useHistory();
  const handleSignOut = () => {
    logout();
    history.replace(<Welcome/>);
  }


  return(
    
    <div>
      <Header/>
      <div className = "dashboardHeader_left">
        <br/>
        <br/>
        <br/>
        <br/>
        <center>
      </center>
      {/* <img className = "img_fit" src={user.photoURL} alt="" /> */}
      </div>
      <div>
        <center>
      <h1 className="titleA2">Select a Location</h1>
      </center>
      </div>
      <div className = "cards">
      <div style = {{background: "#6a7081"}} class="card">
        <div class="card-content">
          <div class="content">
            <center>
            Stuco
            </center>
          </div>
        </div>
      </div>
      <div style = {{background: "#6a7081"}} class="card">
        <div class="card-content">
          <div class="content">
          <center>
            Mezanine
          </center>
          </div>
        </div>
      </div>
      <div style = {{background: "#6a7081"}} class="card">
        <div class="card-content">
          <div class="content">
          <center>
            Elevator Room
          </center>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default GFloor;
