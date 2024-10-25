import "./App.css";
import Logo from "./components/Logo/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Logo />
      {isAuthenticated ? (
        <>
          <Form />
          <PackingList />
          <Stats />
        </>
      ) : (
        <div>
          <h1 className="title">FarAway</h1>
          <h2>The Trip Planning App</h2>
          <p className="welcome-message">
            Please log in to start adding items to your packing list.
          </p>
        </div>
      )}
    </>
  );
};

export default App;
