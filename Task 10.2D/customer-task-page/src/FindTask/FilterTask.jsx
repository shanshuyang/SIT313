import React from "react";
import './FilterTask.css'

function FilterTask(props){
    return(
    <div className="find-task-filter-task-div">
        <p>Tittle: </p>
        <input type="text" name="filter_tittle" className="filter_input" onChange={props.onChange} defaultValue={props.defaultValue.filter_tittle}/>
        <p>Suburb: </p>
        <input type="text" name="filter_suburb" className="filter_input" onChange={props.onChange} defaultValue={props.defaultValue.filter_suburb}/>
        <p>Date: </p>
        <input type="text" name="filter_date" className="filter_input" onChange={props.onChange} defaultValue={props.defaultValue.filter_date}/>
    </div>
    )
}

export default FilterTask