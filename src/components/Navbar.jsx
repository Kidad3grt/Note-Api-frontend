import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("access");

  return (
    <nav className="navbar">
      <h2>Notes App</h2>

      <div>
        {isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;