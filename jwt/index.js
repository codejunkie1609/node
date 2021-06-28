
const jwt = require('jsonwebtoken')
const users = require('./users')
const express = require('express')
const port = 1234
const app = express()
app.use(express.json())
app.use(authentication)

app.get('/',(req,res) => {
    res.write("<h1> WELCOME </h1>")
})
app.get('/api/users',(req,res)=>{
    res.send(users)
})

app.get('/api/users/:id',(req,res)=>{
    user = users.find((user)=>user.id === parseInt(req.params.id))
    if(!user){
        res.status(403).send(`The user with id ${req.params.id} doesn't exists`)

    }
    else res.send(user);
})

app.post('/api/users',(req,res)=>{
    user = req.body
    users.push(user)
    res.send(user)
})

app.put('/api/users/:id',(req,res)=>{
    user = users.find((user)=>user.id === parseInt(req.params.id))
    if(!user){
        res.status(403).send(`The user with id ${req.params.id} doesn't exists`)
    }
    else{
        user.name = req.body.name 
        user.email = req.body.email 
        user.location = req.body.location 
        res.send(user)
    }
    
})

app.delete('/api/users/:id',(req,res)=>{
    user = users.find((user)=>user.id === parseInt(req.params.id))
    if(!user){
        res.status(403).send(`The user with id ${req.params.id} doesn't exists`)
    }
    else{
         const index = users.indexOf(user)
         users.splice(index,1)
         res.send(user)
    }
})

app.post('/login',(req,res) => {
    const details = {
        username : 'charan',
        password : '1234'
    }

    jwt.sign({user:details},'secretkey',(err,token)=>{
        res.send({token:token})
    })
    
})

function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    
    console.log(authheader)
    if (!authheader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
   
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    console.log(auth)
    var user = auth[0]
    var pass = auth[1]
    
    if (user = '1234' && pass == '1234') {
        next();
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
 
}



app.listen(port,()=>{
    console.log(`server started at ${port}`)
})