import React from "react";
import TaskCard from "./TaskCard";
import './TaskCard.css'

function TaskCardList(props){
    const filteredTask = props.taskList.filter(tasks=>{
        if(props.searchTask.filter_tittle !== '' && tasks.tittle !== ''){
            return tasks.tittle.toLowerCase().includes(props.searchTask.filter_tittle.toLowerCase()) 
        }
        else if(props.searchTask.filter_suburb !== '' && tasks.hasOwnProperty('suburb')){
            return tasks.suburb.toLowerCase().includes(props.searchTask.filter_suburb.toLowerCase())
        }
        else if(props.searchTask.filter_date !== '' && tasks.date !== ''){
            return tasks.date.toLowerCase().includes(props.searchTask.filter_date.toLowerCase())
        }
        else{
            return[{}]
        }
    })

    const taskCard = filteredTask.map((task, index)=>
        <TaskCard
            key = {index}
            _id = {task._id}
            tittle = {task.tittle}
            description = {task.description}
            suburb = {task.suburb}
            date = {task.date}
            task_type = {task.task_type}
            image = {task.image} 
            budget_type = {task.budget_type}
            budget_number = {task.budget_number}
            refresh={props.refresh}/>
    )

    return(
        <div className="task-card-row">
            {taskCard}
        </div>
    )
}

export default TaskCardList