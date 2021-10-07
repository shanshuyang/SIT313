const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Task = require("./models/Task")
const cors = require("cors")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json({limit : "2100000kb"}))

mongoose.connect("mongodb://localhost:27017/taskDB", {useNewUrlParser:true, useUnifiedTopology: true})

const generateRandomId=(length)=>{
    return Math.random().toString(36).substr(3,length);
}

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

app.get('/findtask', (req, res)=>{
    Task.find({_id: {$ne: null}}, (err, docs)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(docs)
        }
    })
})

app.post('/createtask', (req, res)=>{
    const task = new Task({
        Key: generateRandomId(8),
        task_type: req.body.task_type,
        tittle: req.body.task_tittle,
        description: req.body.task_description,
        image: req.body.task_image,
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
})

app.post('/deletetask', (req, res)=>{
    Task.findByIdAndRemove(req.body._id, (err) =>{
        if(err){
            console.log(err)
        }
    })
})



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, (req,res)=>{
    console.log("Server is running on port 8000")
})