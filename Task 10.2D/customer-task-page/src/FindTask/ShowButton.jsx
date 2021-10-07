import React from "react";
import './ShowButton.css'

function ShowButton(props){
    return(<div><button type="submit" className="show-all-tasks-btn" onClick={props.onClick}>Show all tasks</button></div>)
}

export default ShowButton