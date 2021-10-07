import React from "react";
import "./Content.css"
import TaskSettingSuburb from "./TaskSettingSuburb";

function TaskSetting(props){    
    return(
        <div className="task-setting-div">
            {props.isTypePerson ? <TaskSettingSuburb onChange={props.onChange} /> : null}           
            <div className="task-setting-date-div">
                <div className="task-date-div">
                    <div className="task-date-p-div">
                        <p className="task-date-p">Date</p>
                    </div>
                    <input type="text" name="task_date" placeholder="Enter a date" onChange={props.onChange}/>
                </div>
            </div>
        </div>
    )
}

export default TaskSetting