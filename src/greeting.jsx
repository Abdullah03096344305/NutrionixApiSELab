import React from "react";
import "./greeting.css";

function Greeting(props) {
    //return "Hello Welcome to my React App";
    return <h1>Hello, {props.name}! Welcome to my React App</h1>
}
export default Greeting;