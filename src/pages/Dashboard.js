import './Dashboard.css';
import { auth, signInWithEmailAndPassword, signInWithGoogle, logout } from "../data"


function Dashboard({ user }) {

  return(
    <div>
      <h1>Hello, {user.displayName}</h1>
      <img src={user.photoURL} alt="" />
      <button className="button signout" onClick={logout}>Sign out</button>

    </div>
  );
}

export default Dashboard;
