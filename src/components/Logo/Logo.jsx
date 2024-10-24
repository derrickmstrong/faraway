import { useAuth0 } from "@auth0/auth0-react";
import "./Logo.css";

const Logo = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="logo-container">
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
  );
};

export default Logo;
