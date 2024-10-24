import { useAuth0 } from "@auth0/auth0-react";
import "./Logo.css";

const Logo = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="logo-container">
      <div>
        {isAuthenticated && user && (
          <span className="user-name">Welcome, {user.name}</span>
        )}
      </div>
      <div>
        <span className="logo-text">🌴 FarAway 🧳</span>
        {isAuthenticated ? (
          <button
            className="auth-button"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </button>
        ) : (
          <button className="auth-button" onClick={() => loginWithRedirect()}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Logo;
