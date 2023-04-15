import '../style.css'
import Login from "./popup/login/Login";
import React from "react";
import { render } from "react-dom";

render(
 <Login />,
  window.document.getElementById("app-container")
);
