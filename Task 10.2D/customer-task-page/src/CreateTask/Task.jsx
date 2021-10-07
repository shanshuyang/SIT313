import React, { useState } from 'react';
import Button from './Button';
import Header1 from './Header1';
import Header2 from './Header2';
import Header3 from './Header3';
import Header4 from './Header4';
import TaskDescribe from './TaskDescribe';
import TaskRemuneration from './TaskRemuneration';
import TaskSetting from './TaskSetting';
import TaskType from './TaskType';

function Task(){
    const [isPerson, setIsPerson] = useState(true)
    const [image, setImage] = useState()
    const [src, setSrc] = useState('')
    const [task, setTask] = useState({
        task_type: 'person',
        task_tittle: '',
        task_description: '',
        task_image: '',
        task_suburb: '',
        task_date: '',
        remuneration_type: 'total',
        remuneration_number: ''
    })
    const onTypeChange = (e)=>{
      if(e.target.value === "person"){
        setIsPerson(true)
        setTask((preValue)=>{
            return{
                ...preValue,
                task_type: "person"
            }
        })
      }
      else{
        setIsPerson(false)
        setTask((preValue)=>{
            return{
                ...preValue,
                task_type: "online"
            }
        })
      }
    }
    const handleChange = (event)=>{
        const {name, value} = event.target
        setTask((preValue)=>{
            return{
                ...preValue,
                [name]: value
            }
        })
    }
    const handleImageChange = (event)=>{
        let files = event.target.files
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e)=>{
            setSrc(e.target.result)  
        }
    }
    const handleSubmit = ()=>{
        setImage(src)  
        if(src !== ''){
            setTask((preValue)=>{
                return{
                    ...preValue,
                    task_image: src
                }
            })   
        }
        else{
            setImage()
        }          
    }
    
    const handleClick = ()=>{
        fetch('http://localhost:8000/createtask',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                task_type: task.task_type,
                task_tittle: task.task_tittle,
                task_description: task.task_description,
                task_image: task.task_image,
                task_suburb: task.task_suburb,
                task_date: task.task_date,
                remuneration_type: task.remuneration_type,
                remuneration_number: task.remuneration_number
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err=>{
            console.log("Error: " + err)
        })
    }
    return (
        <div className="App">
          <Header1 />
          <TaskType typeChange={onTypeChange}/>
          <Header2 />
          <TaskDescribe image={image} onChange={handleChange} onImageChange={handleImageChange} onClick={handleSubmit}/>
          <Header3 />
          <TaskSetting isTypePerson={isPerson} onChange={handleChange}/>
          <Header4 />
          <TaskRemuneration onChange={handleChange}/>
          <Button onClick={handleClick}/>
        </div>
    );
}

export default Task