import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import Spinner from "../src/components/Spinner/Spinner.jsx";
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const renderApp = () => {
  document.body.classList.remove("loading");
  root.render(
    <StrictMode>
      <Router>
        <Auth0ProviderWithHistory>
          <UserProvider>
            <App />
          </UserProvider>
        </Auth0ProviderWithHistory>
      </Router>
    </StrictMode>
  );
};

const showSpinner = () => {
  document.body.classList.add("loading");
  root.render(<Spinner />);
};

const hideSpinner = () => {
  setTimeout(() => {
    renderApp();
  }, 1250);
};

showSpinner();

window.addEventListener("load", hideSpinner);
