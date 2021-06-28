const path = require('path')
const express = require('express')
const { parse } = require('path')
const app = express()
const port = 1234
//app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
 
app.get("/",(req,res) => {
    //res.sendFile(__dirname+'/index.html')
    res.render('index')
})
app.get("/aboutus",(req,res) => {
    result = parseInt(req.query.f1)+parseInt(req.query.f2)
    res.render('aboutus.ejs',{result:result})
})
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log('server listening at port'+port)
    console.log(path.join(__dirname,'public'))
})