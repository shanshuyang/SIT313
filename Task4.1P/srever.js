const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const validator = require("validator")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use('/public', express.static("public"))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

mongoose.connect("mongodb://localhost:27017/iServiceDB", {useNewUrlParser:true})

const accountSchema = new mongoose.Schema(
    {
        country:{
            type: String, 
            validate(value){
                if(!(value=='America' || value=='Australia' || value=='China' || value=='England' || value=='France' || value=='Russia')){
                    throw new Error('Must select one country!')
                }
            }
        },
        fname:{
            type: String, 
            required: [true, 'Must input your first name!']
        },
        lname:{
            type: String,
            required: [true, 'Must input your last name!']
        },
        email:{
            type: String,
            trim: true,
            required: [true, 'Must input your email!'],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is not valid!')
                }
            }
        },
        password:{
            type: String,
            minlength: [8, 'Must be more than 8 characters!'],
            maxlength: [16, 'Must be less than 16 characters!'],
            required: [true, 'Must input the password!']
        },
        confirm:{
            type: String,
            minlength: [8, 'Must be more than 8 characters!'],
            maxlength: [16, 'Must be less than 16 characters!'],
            required: [true, 'Must input the confirm password!']
        },
        address:{
            type: String,
            required: [true, 'Must input your address!']
        },
        city:{
            type: String,
            required: [true, 'Must input your city!']
        },
        state:{
            type: String,
            required: [true, 'Must input your state!']
        },
        ZIP: String,
        phone: String
    }
)

const Account = new mongoose.model("Account", accountSchema);

app.post('/', (req,res)=>{
    const account = new Account({
        country: req.body.country,
        fname: req.body.first_name,
        lname: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        confirm: req.body.confirm_password,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        ZIP: req.body.ZIP_code,
        phone: req.body.phone_number
    })
    if(account.password == account.confirm){
        account.save((err)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send("Inserted successfully!")
                console.log(account)
           }
        })
    }
    else{
        res.send('Password and confirm password must be same!')
    }
})


app.listen(5000, (req,res)=>{
    console.log("Server is running on port 5000")
})
