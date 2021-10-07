import React from "react";
import "./Button.css"

function Button(props){
    return(
        <div className="post-button-div">
            <button type="submit" onClick={props.onClick}>Post Task</button>
        </div>
    )
}

export default Button