import { useAuth0 } from "@auth0/auth0-react";
import "./Logo.css"; // Assuming you have a CSS file for styling

const Logo = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return (
    <div className="logo-container">
      <span className="logo-text">🌴 FarAway 🧳</span>
      {isAuthenticated && user ? (
        <div className="user-info">
          <span className="user-name">Welcome, {user.name}</span>
          <button
            className="auth-button"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </button>
        </div>
      ) : (
        <button className="auth-button" onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}
    </div>
  );
};

export default Logo;
