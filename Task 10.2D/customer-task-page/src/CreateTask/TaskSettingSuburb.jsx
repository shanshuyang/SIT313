import React from "react";
import "./Content.css"

function TaskSettingSuburb(props){
    return(
        <div className="task-suburb-div">
            <div className="task-suburb-p-div">
                <p className="task-suburb-p">Suburb</p>
            </div>
            <input type="text" name="task_suburb" placeholder="Enter a suburb" onChange={props.onChange}/>
        </div>
    )
}

export default TaskSettingSuburb