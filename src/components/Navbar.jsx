import { useNavigate } from "react-router-dom";
import {logoutUser} from "../api"
import "../styles/Navbar.css"


function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const handleLogout = () => {
    logoutUser(); // removes tokens
    setIsLoggedIn(false); // tell React to re-render
  };

  const navigate = useNavigate();
  
 return (
  <nav className="navbar">
    <div className="navbar-container">
  
      {/* LEFT SIDE — APP NAME */}
      <h2 className="navbar-logo"
          onClick={() => navigate("/")}>
          Notes App
      </h2>

      {/* RIGHT SIDE — ACTIONS */}
      <div className="navbar-actions">
        {isLoggedIn && (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

     </div>
   </nav>
);
}

export default Navbar;