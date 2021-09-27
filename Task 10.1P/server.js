const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Task = require("./models/Task")
const cors = require("cors")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/taskDB", {useNewUrlParser:true, useUnifiedTopology: true})

//get and post
app.get('/', (req, res)=>{
    Task.count({_id: {$ne: null}}, (err, count)=>{
        if(err){
            res.send(err)
        }
        else{
            if(count == 0){
                res.send("Watting a new task.")
            }
            else{
                Task.find({_id: {$ne: null}}, (err, task)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send(task)
                    }
                })
            }
        }
    })
 
})

app.post('/task', (req, res)=>{
    const task = new Task({
        task_type: req.body.task_type,
        tittle: req.body.task_tittle,
        description: req.body.task_description,
        date: req.body.task_date,
        budget_type: req.body.remuneration_type,
        budget_number: req.body.remuneration_number
    })
    if(req.body.task_type == "person"){
        task.set("suburb", req.body.task_suburb)
    }
    task.save()
    .catch((err) => console.log(err))
    console.log(task)
    res.redirect('/')
})



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, (req,res)=>{
    console.log("Server is running on port 8000")
})