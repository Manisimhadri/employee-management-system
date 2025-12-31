import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/login.css";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/toast.css";


import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
