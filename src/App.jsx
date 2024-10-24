import "./App.css";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
      <Logo />
      {isAuthenticated ? (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
          <Form />
          <PackingList />
          <Stats />
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </>
  );
};

export default App;
