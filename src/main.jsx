import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import App from "./App.jsx";
import Spinner from "../src/components/Spinner/Spinner.jsx";
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const renderApp = () => {
  document.body.classList.remove("loading");
  root.render(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
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
  }, 3000);
};

showSpinner();

window.addEventListener("load", hideSpinner);
