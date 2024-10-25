import { useAuth0 } from "@auth0/auth0-react";

const Logo = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return (
    <div className="logo-container">
      <div className="logo-row">
        <span>🌴 FarAway 🧳</span>
        {isAuthenticated ? (
          <div className="auth-button">
            {user && (
              <div className="welcome-container">
                <span className="user-name">Welcome, {user.given_name}</span>
              </div>
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
