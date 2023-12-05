import Hotjar from "@hotjar/browser";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const siteId = process.env.HOT_JAR_SITE_ID;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
