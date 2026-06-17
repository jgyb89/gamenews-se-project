import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App.jsx";
import Footer from "./components/Footer/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Footer />
  </StrictMode>,
);
