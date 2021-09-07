const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Expert = require("./models/Experts.js")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/expertDB",{useNewUrlParser: true})

app.route('/experts')
//Retrieving all experts
.get((req, res)=>{
    Expert.find((err, expertList)=>{
        if (err) {
            res.send(err)
        }
        else {
            res.send(expertList)
        }
    })
})
//Adding a expert
.post((req, res)=>{
    const expert = new Expert({
        expert_name: req.body.name,
        expert_password: req.body.password,
        expert_address: req.body.address,
        expert_phone: req.body.phone,
        _id: req.body.id
    })
    expert.save((err) =>{
        if (err) {
            res.send(err)
        }
        else{
            res.send ('Successfully added a new expert!')
        }
    })
})
//Removing all experts
.delete((req, res)=>{
    Expert.deleteMany((err) =>{
        if (err) {
            res.send(err)
        }
        else {
            res.send('Successfully deleted all experts!')
        }
    })
})

app.route('/experts/:id')
//Retrieving a specific expert
.get((req, res)=>{
    Expert.findOne({_id: req.params.id}, (err, expert)=>{
        if (expert) {
            res.send(expert)
        }
        else {
            res.send("Can't find the expert!")
        }
    })
})
//Updating a specific expert
.put((req, res)=>{
    Expert.updateOne(
        {_id: req.params.id}, 
        {
            expert_name: req.body.name,
            expert_address: req.body.address,
            expert_phone: req.body.phone,
            expert_password: req.body.password
        },
        (err)=>{
            if (err) {
                res.send(err)
            }
            else {
                res.send('Successfully updated the id:' + req.params.id + ' expert!')
            }
        })
})
//Removing a specific expert
.delete((req, res)=>{
    Expert.deleteOne({_id: req.params.id}, (err)=>{
        if (err) {
            res.send(err)
        }
        else {
            res.send('Successfully deleted the id:' + req.params.id + ' expert!')
        }
    })
})
//Updating a specific expert’s address and mobile phone and password
.patch((req, res)=>{
    const newAddress = req.body.address
    const newPhone = req.body.phone
    const newPassword = req.body.password
    if(newAddress != null && newPhone != null){
        Expert.updateOne(
            {_id: req.params.id},
            {$set: {expert_address: newAddress, expert_phone: newPhone}},
            (err)=>{
                if (!err) {
                    res.send('Successfully updated address and phone! ')
                }
                else {
                    res.send(err)
                }
            }
        )
    }
    else if(newPassword != null){
        Expert.updateOne(
            {_id: req.params.id},
            {$set: {expert_password: newPassword}},
            (err)=>{
                if (!err) {
                    res.send('Successfully updated password! ')
                }
                else {
                    res.send(err)
                }
            }
        )
    }
    else{
        res.send('Only the address, phone number and password can be modified separately!')
    }
})

app.listen(process.env.PORT || 8000, ()=>{
    console.log('Server started on port 8000');
})