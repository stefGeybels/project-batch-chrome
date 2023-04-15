import '../style.css'
import React from "react";
import { render } from "react-dom";
import App from './popup/App';

render(
 <App />,
  window.document.getElementById("app-container")
);
