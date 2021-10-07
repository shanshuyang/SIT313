import React from "react";
import "./Content.css"

function TaskRemuneration(props){
    return(
        <div className="task-remuneration-div">
            <p className="task-remuneration-p">What is your budget?</p>
            <br/>
            <br/>
            <p className="task-remuneration-p">(This is an estimate)</p>
            <br />
            <br />
            <div className="task-remuneration-type-div">
                <div>
                    <label>
                        <input id="pay1" type="radio" name="remuneration_type" value="total" defaultChecked onChange={props.onChange}/>
                        <span>Total</span>
                    </label> 
                </div>
                <div>
                    <label>
                        <input id="pay2" type="radio" name="remuneration_type" value="hourly" onChange={props.onChange}/> 
                        <span>Hourly rate</span>
                    </label>
                </div>
            </div>
            <input className="task-remuneration-input" type="text" name="remuneration_number" placeholder="$" onChange={props.onChange}/>
        </div>
    )
}

export default TaskRemuneration