import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { installDevHarness } from "./dev/harness";
import "./styles/global.css";
import "./styles/components.css";

installDevHarness();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
