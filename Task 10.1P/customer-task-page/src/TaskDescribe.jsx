import React from "react";
import "./Content.css"

function TaskDescribe(props){
    return(
        <div className="task-describe-div">
            <div className="task-title-div">
                <div className="task-title-p-div">
                    <p className="task-title-p">Task Title</p>
                </div>
                <input type="text" name="task_tittle" placeholder="Enter task title" onChange={props.onChange}/>
            </div>
            <div className="task-description-div">
                <div className="task-description-p-div">
                    <p className="task-description-p">Description</p>
                </div>
                <textarea name="task_description" placeholder="Enter task description" rows="5" onChange={props.onChange}/>
            </div>
        </div>
    )
}

export default TaskDescribe

