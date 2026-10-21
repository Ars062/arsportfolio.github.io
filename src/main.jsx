import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const PAGE_BG = {
  pink: "linear-gradient(-45deg, #fdeef3 0%, #f9e0ea 25%, #fdf0f5 50%, #f8e2ec 75%, #fdeef3 100%)",
  sky: "linear-gradient(-45deg, #e8f2fd 0%, #dceaf9 25%, #eef5fd 50%, #deecfb 75%, #e8f2fd 100%)",
  lavender: "linear-gradient(-45deg, #ece9fb 0%, #e2e0f7 25%, #f0eefc 50%, #e6e2f8 75%, #ece9fb 100%)",
  peach: "linear-gradient(-45deg, #fdeee2 0%, #fbe2d0 25%, #fdf2e8 50%, #fae0d2 75%, #fdeee2 100%)",
  mint: "linear-gradient(-45deg, #eef6f2 0%, #e2f0ec 25%, #f0f7f4 50%, #dfeeea 75%, #eef6f2 100%)",
  butter: "linear-gradient(-45deg, #fdf6e3 0%, #f9edcd 25%, #fdf8ea 50%, #f7eccf 75%, #fdf6e3 100%)",
  lilac: "linear-gradient(-45deg, #f3ecfb 0%, #ebdff8 25%, #f6f0fd 50%, #eadef8 75%, #f3ecfb 100%)",
  coral: "linear-gradient(-45deg, #fdeae4 0%, #fbd7cc 25%, #fdeee9 50%, #fad8cd 75%, #fdeae4 100%)",
  seafoam: "linear-gradient(-45deg, #e4f7f4 0%, #cdeee9 25%, #eaf9f6 50%, #cfefeb 75%, #e4f7f4 100%)",
  periwinkle: "linear-gradient(-45deg, #e9ecfb 0%, #dde1f8 25%, #eff1fd 50%, #dfe3fa 75%, #e9ecfb 100%)",
  sage: "linear-gradient(-45deg, #eef4e8 0%, #e0ecd4 25%, #f3f7ee 50%, #e2eeda 75%, #eef4e8 100%)",
  sand: "linear-gradient(-45deg, #f7f0e2 0%, #f0e6d0 25%, #faf5eb 50%, #f1e8d6 75%, #f7f0e2 100%)",
  ice: "linear-gradient(-45deg, #eef4f7 0%, #dfeaef 25%, #f2f7f9 50%, #e1ecf1 75%, #eef4f7 100%)",
  rose: "linear-gradient(-45deg, #fbe9ef 0%, #f6d5e1 25%, #fcedf2 50%, #f7d8e4 75%, #fbe9ef 100%)",
  apricot: "linear-gradient(-45deg, #fdf0e4 0%, #fbe4cb 25%, #fdf4ec 50%, #fbe6cf 75%, #fdf0e4 100%)",
};

const requested = new URLSearchParams(window.location.search).get("bg");
const PORT_BG = {
  "8000": "sage",
  "8001": "periwinkle",
  "8002": "seafoam",
  "8003": "apricot",
  "8004": "ice",
};
const port = window.location.port;
const chosen = requested || PORT_BG[port];
if (chosen && PAGE_BG[chosen]) {
  document.documentElement.style.setProperty("--page-bg", PAGE_BG[chosen]);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
