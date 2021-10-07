import React, { useState } from "react";
import './TaskCard.css'

function TaskCard(props){
    const [isDetails, setIsDetails] = useState(false)
    const [buttonName, setButtonName] = useState('Details')
    const basic = <div>
        <p>Tillle: {props.tittle}</p><br/><br/>
        <p>Description: {props.description}</p><br/><br/>
        <p>Suburb: {props.suburb}</p><br/><br/>
        <p>Date: {props.date}</p><br/><br/>
    </div>
    const details = <div>
        <p>Task type: {props.task_type}</p><br/><br/>
        <p>Budget type: {props.budget_type}</p><br/><br/>
        <p>Budget number: {props.budget_number}</p><br/><br/>
        <img className="task-card-image" src={props.image} alt="" width={300} height={180}/>        
    </div>
    const handleSubmit = ()=>{
        if(isDetails === false){
            setIsDetails(true)
            setButtonName('Close')
        }
        else{
            setIsDetails(false)
            setButtonName('Details')
        }
    }
    const handleDelete = () =>{
        fetch('http://localhost:8000/deletetask',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                _id: props._id,
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err=>{
            console.log("Error: " + err)
        })
        .then(props.refresh)
    }
    return(
        <div className='task-card-column'>
            {basic}
            {isDetails ? details : null}           
            <button type="submit" className="task-card-details-btn" onClick={handleSubmit}>{buttonName}</button>
            <br/><br/><br/>
            <button type="submit" className="task-card-delete-btn" onClick={handleDelete}>Delete</button> 
        </div>
    )
}

export default TaskCard