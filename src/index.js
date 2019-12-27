import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Builder from "./components/Builder.js"

/*
 * width:   46
 * height:  46
 */
ReactDOM.render(
    <Builder width={25} height={25} />,
    document.getElementById('root')
);