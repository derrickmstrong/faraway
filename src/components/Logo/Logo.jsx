import "./Logo.css";
import { useAuth0 } from "@auth0/auth0-react";

const Logo = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("user", user);

  // Add profile picture component to the logo
  const profilePicture = user ? (
    <img className="profile-picture" src={user.picture} alt={user.name} />
  ) : null;

  return (
    <div className="logo-container">
      <div className="logo-row">
        <span>🌴 FarAway 🧳</span>
        {isAuthenticated ? (
          <div className="auth-button">
            {user && (
              <>
                <span>{profilePicture}</span>
                <span className="welcome-container">
                  {user.given_name}
                </span>
              </>
            )}
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-button">
            <button onClick={() => loginWithRedirect()}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
