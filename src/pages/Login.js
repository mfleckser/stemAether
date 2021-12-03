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
    <div>
        <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
