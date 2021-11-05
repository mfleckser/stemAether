import './Dashboard.css';
import { useHistory } from "react-router-dom"
import { auth, signInWithEmailAndPassword, signInWithGoogle, logout } from "../data"
import Welcome from './Welcome';


function Dashboard({ user }) {
  let history = useHistory();


  const handleSignOut = () => {
    logout();
    history.replace(<Welcome/>);
  }


  return(
    <div>
      <h1>Hello, {user.displayName}</h1>
      <img src={user.photoURL} alt="" />
      <button className="button signout" onClick={handleSignOut}>Sign out</button>

    </div>
  );
}

export default Dashboard;
