import { useAuth0 } from "@auth0/auth0-react";
import "./Logo.css";

const Logo = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  console.log('isAuthenticated', isAuthenticated);
  console.log('user', user);

  return (
    <div className="logo-container">
      <span className="">🌴 FarAway 🧳</span>
      {isAuthenticated ? (
        <button
          className="auth-button"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </button>
      ) : (
        <div className="auth-button">
          {isAuthenticated && user && (
            <span className="user-name">Welcome, {user.name}</span>
          )}
          <button className="" onClick={() => loginWithRedirect()}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Logo;
