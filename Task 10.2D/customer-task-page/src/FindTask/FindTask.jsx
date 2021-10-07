import React, {useState} from 'react';
import Header from './Header';
import FilterTask from './FilterTask'
import TaskCardList from './TaskCardList';
import ShowButton from './ShowButton';


function FindTask() {
  const [tasks, setTasks] = useState([
    {
      tittle:'',
      suburb:'',
      date:''
    }
  ])
  const [searchTerm, setSearchTerm] = useState(
    {
      filter_tittle:'',
      filter_suburb:'',
      filter_date:''
    }
  )

  const handleShowClick = () =>{
    fetch('http://localhost:8000/findtask')
    .then(response => response.json())
    .then(data => setTasks(data))
    .then(console.log(tasks))
  }

  const onSearchChange = (e)=>{
    const {name, value} = e.target
    setSearchTerm((preValue)=>{
        return{
            ...preValue,
            [name]: value
        }
    })
  }
  return (
    <div className="find-task">
        <Header/>
        <ShowButton onClick={handleShowClick}/>
        <FilterTask onChange={onSearchChange} defaultValue={searchTerm}/>
        <TaskCardList taskList={tasks} searchTask={searchTerm} refresh={handleShowClick}/>
    </div>
  );
}

export default FindTask;