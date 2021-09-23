const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Account = require("./models/Account")
const validator = require("validator")
const bcrypt = require("bcrypt")
const passport = require("passport")
const session = require("express-session")
const AlipaySdk = require("alipay-sdk").default
const AlipayFormData = require("alipay-sdk/lib/form").default

const alipaySdk = new AlipaySdk({
    appId: '2021000117667794',
    gateway: 'https://openapi.alipaydev.com/gateway.do',
    privateKey: 'MIIEpAIBAAKCAQEA6NrGvLz/i071vAE5UGK8puZ3MJYEyQySuwrsrwHK+yAceDhBcEfIVtOLnsRXEeIFkQjeyGRqBHNpxKM/oFANWWgkjwYlFMjXflhp96LKOuMnNVCcMr97lHWvthhpudNAlimgT/jVEk7wZxgOPk/kR6DRrnTRQf+bG1/GhOxer3L7duWk0EtgvfqcTLXVqOFM4ke9WYPkCtFShG9J1/lpkPzSzIAXO283wGmel4awVrtKkQiCUPuWH0kxrW8sjbcqND2HWVhWoR1pZMTrOjbX4N1czSQHnSm4x379Qf3gwt2XWG9xUNWSlmAZqE+j1p/038wQZgcotzBhhanm93+NqQIDAQABAoIBAQCXUd0GuBelEyn0BCOXzqJkH67jHwp7ELWl4WKQFC0xZtu5cG1uJufVLOI1ycf/cg9GAiqstTyEKfBY/fGSH5OdP2VKoKamTCJmE9TBPcQH4qgPKJRpEjCf+J64SkMipFr7eo+YiM8Gd9AYXvSan9ZsieDZa0a1igLlFidvKCAcCPJzi4c5cLZODMzsrCsxuE264zveQ0AsG2/kr8kqp6THtJGaqzzZtEcdf+UjGo1Wr9g3pu0nGPJC2pJdAoE/XHj7ERBFN+VDCzu6jad/7OY6/WSEVfo3ucI32dGIHske+7lsPwRoM/rJJkV2RL0FixXyW5IVbNtm9QsuTP/zPYY1AoGBAPZ/Tln87Yc4tEO32DUW86xvvD25SQSUN2sNFXALKqhrj8iwfYvTx/zvmXfeFwdm7dlFcaYjOYkgF8dQftwVLTc4S7Yn55ZB5Aks20Asa6FYTVoel2ednVgnlbIwXAN6B6+hEgMR0CAQtI3TvtmfJi6KqZdWuwwiFRAKBEl9V2jjAoGBAPHU1G/dgeekSNvW7/xGDJMKuWGrnrfRqEOpSrQ/PTPyc3gmedcw8mdXDi4sAznSskkjojpaHkAddxMx45+qcwugMwcgqz202+nAApz/L0/yyL6lRwhyNpVnL5IkgsAUKBceZVfXkhXeZCmgV2CuT7UMZi75lIO1EHAKYbVBSNEDAoGBAMMco8VBGjbVoIKVrBLh1wFf9E2bMvvn4jHfSl/ExwBHG6nMYaPjf8JrWTvzVKEsTQqVGE9cRHeRKqE+yxuju4WhDvThg0OBZmII2odiYdN1lMzHuCpxLRGRS8Ge28Z4ukq/oQVC/U3US0aUG9YgTlW6tmCvayFAfRGUDC6rgxvnAoGAKmfLqKIK+XeRXxtdkbsm0VH8F+hkOI+HFfZFpz2/mbBWFyeIDfgDSaO2VNpa5nTP1ottExZiX5PLIY6J/6F/8vXwfLt5y6Q/O8nzq1wEC9zi3qtUvWJpt+EUMmg8lTnznboywyiF8VfB8JqxN77ZM0ItWOdi54WEkGEBqSr9fckCgYANv9AMAGx2aikjxS4tM6t4fLFM8XIT2ETVWs8oe66YF2PG38I/JkJgTAroMCHm4S3gYtPT2KqW9joZfQ5WvfI7v07GmpNxHSeh7R6Ci7EsCRp+7s8XJzfK0C0ojsLueekKoWMYT2ufkQCZN+bUUx/Kznf95RUwfcQ0FYhFodYFzQ==',
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgb2EXS5V5a0fBHHI/5Fdzv6CgkadbtV4D86KLGnF2P4zJoKZmMeRZXLQIGpKf1mHHqxSXcNqjK8DdNobLvKhg/m+rYam599kqwXUWTgRrMKKKGff78xJ1ttD4Jw+m9eBrwuEDkApNF/p9d+QXDIXnb7FkAOsfxbpMQj/b27t0vaPK3ieepBSvQ0dZCUfiszjHc/3TCv2wjCC7d46j5f9QTIMY/IQVv9QYpi7qWH4DKapWbTCIip28ZKIlkYcz23nnKL73LbzwIltUH6XEs14gEwYfJdWblXJsbqUESMEOWp5YhacHwEbxQq2e2d4M959/0iJO+JX/8re/0WkTykIQIDAQAB'
})

const saltRounds = 10
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use('/public', express.static("public"))
app.use(session({
    cookie: {maxAge: 120000},
    resave: false,
    saveUninitialized: false,
    secret: 'iServerSecret'
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/custlogin.html")
})
app.get('/custsignup', (req, res)=>{
    res.sendFile(__dirname + "/custsignup.html")
})
app.get('/githublogin', (req, res)=>{
    //GET code
    const {query} = req
    const {code} = query
    if(code == null){
        return res.send({
            success: false,
            message: 'Error: no code'
        })
    }
    else{
        console.log('code:' + code)
        res.sendFile(__dirname + "/custtask.html")
    }
})
app.get('/custtask', (req, res)=>{
    if(!req.isAuthenticated()){
        res.sendFile(__dirname + "/custtask.html")
    }
    else{
        res.redirect('/')
    }
})

//mongoose
const uri = "mongodb+srv://yss:200031@cluster0.cqefb.mongodb.net/iServiceDB?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect("mongodb://localhost:27017/iServiceDB", {useNewUrlParser:true})
//mongoose.connect("mongodb://yss:200031@cluster0-shard-00-00.cqefb.mongodb.net:27017,cluster0-shard-00-01.cqefb.mongodb.net:27017,cluster0-shard-00-02.cqefb.mongodb.net:27017/iServiceDB?ssl=true&replicaSet=atlas-hikqm1-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser:true})
passport.use(Account.createStrategy())
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

app.post('/custsignup', (req, res)=>{
    const account = new Account({
        country: req.body.country,
        fname: req.body.first_name,
        lname: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        confirm: req.body.confirm_password,
        hashcode: "",
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        ZIP: req.body.ZIP_code,
        phone: req.body.phone_number
    })
    if(account.password == account.confirm){
        bcrypt.hash(account.password, saltRounds, (err, hash)=>{
            if(err){
                res.send(err)
            }
            else{
                account.hashcode = hash
                account.save((err)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.sendFile(__dirname + "/registersuccess.html")
                        console.log(account)
                   }
                })    
            }        
        })
    }
    else{
        res.send('Password and confirm password must be same!')        
    }
})

app.post('/registersuccess', (req, res)=>{
    res.sendFile(__dirname + "/custlogin.html")
})
app.post('/custlogin', (req, res)=>{
    const email = req.body.login_email
    const password = req.body.login_password
    Account.findOne({"email": email}, 'hashcode', (err, account)=>{
        if(err){
            console.log(err)
        }
        else{
            bcrypt.compare(password, account.hashcode, (err, result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    if(result == true){
                        /*passport.authenticate('local')(req, res, ()=>{
                            res.redirect('/custtask')
                        })*/
                        res.sendFile(__dirname + "/custtask.html")
                    }
                    else{
                        res.send('Invalid email or password!')
                    }
                }
            })
        }
    })
})

app.post('/alipay', async(req, res)=>{
    const formData = new AlipayFormData()
    formData.setMethod('get')
    formData.addField('notifyUrl', 'http://localhost:8000/alipay')
    formData.addField('bizContent', {
        outTradeNo: '1582976759788',
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: '0.01',
        subject: 'Product',
        body: 'Product details',
    })
    const result = await alipaySdk.exec('alipay.trade.page.pay', {}, {formData: formData})
    console.log(result)
    res.redirect(result)
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, (req,res)=>{
    console.log("Server is running on port 8000")
})
