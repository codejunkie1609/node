const http = require('http')

const users = require('./users')
const express = require('express')
const port = 1234
const app = express()
app.use(express.json())
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





app.listen(port,()=>{
    console.log(`server started at ${port}`)
})