import './Welcome.css';
import { useParams } from "react-router-dom"
import { signInWithGoogle } from "../data.js"
import { useHistory } from "react-router-dom"


function Login() {
    let history = useHistory();
    let { roomNum } = useParams();

    const handleLogin = () => {
        alert(roomNum);
        signInWithGoogle();
        history.push("/checkin/" + roomNum);
    }

  return (
      <div className= "wholeThing">
      <p className="welcomeTitle">Welcome To</p> 

      <div className="mfTitle">
        <h1 className="titleSTEM">STEM</h1>
        <h1 className="titleAE"> AETHER</h1>
      </div>


        <button className = "buttonSignIn" onClick={handleLogin}>Sign In With Google</button>


      </div>
  );
}

export default Login;
