import './Dashboard.css';
import { useHistory } from "react-router-dom"
import { auth, signInWithEmailAndPassword, signInWithGoogle, logout } from "../data"
import Welcome from './Welcome';
import GFloor from './GFloor';
import HomeIcon from "@material-ui/icons/Home"
import Header from '../components/Header'
import 'bulma/css/bulma.min.css';



function Dashboard({ user }) {
  let history = useHistory();
  const handleSignOut = () => {
    logout();
    console.log("Signed out")
    history.replace(<Welcome/>);
  }

  const onClickG = () => history.push("/ground");
  const onClick1 = () => history.push("/firstFloor");
  const onClick2 = () => history.push("/secondFloor");




  return(
    
    <div>
      <Header/>
      <div className = "dashboardHeader_left">
        <br/>
        <br/>
        <br/>
        <br/>
        <center>
      <h1>Hello, {user.displayName}</h1>
      </center>
      {/* <img className = "img_fit" src={user.photoURL} alt="" /> */}
      {/* <HomeIcon/> */}
      <button class="button is-dark" onClick={handleSignOut}>Sign out</button>
      </div>
      <div>
        <center>
      <h1 className="titleA2">Select a Floor</h1>
      <br/>
      </center>
      </div>
      <div className = "cards">
      <div onClick={onClickG} style = {{background: "#6a7081"}} class="card">
        <div class="card-content">
          <div class="content">
            <center>
            G
            </center>
          </div>
        </div>
      </div>
      <div onClick={onClick1} style = {{background: "#6a7081"}} class="card">
        <div class="card-content">
          <div class="content">
          <center>
            1
            </center>
          </div>
        </div>
      </div>
      <div onClick={onClick2} style = {{background: "#6a7081"}} class="card">
        <div class="card-content">
          <div class="content">
          <center>
            2
            </center>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
