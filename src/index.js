import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Builder from "./components/Builder.js"

/*
 * width:   46
 * height:  46
 */
ReactDOM.render(
    <Builder width={20} height={20} />,
    document.getElementById('root')
);