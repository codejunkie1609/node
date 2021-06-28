const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/testDB',{useNewUrlParser : true, useUnifiedTopology : true}).then(()=>{
    console.log('connection successful')
}).catch((err)=>{
    console.log(err)
})

const schema = new mongoose.Schema({
    name : {type :String,required:true},
    title: String,
    age: Number,
    location : String,
    phone : Number

})

const userCollection = new mongoose.model('UserCollection',schema)

/*var userList = new userCollection({
    name : "charan",
    title:"student",
    location:"hyderabad",
    phone:12345,

})
userList.save().then(()=>{
    console.log("inserted successfully")
}).catch((err)=>{
    console.log(err)
})*/

/*const userDoc = async ()=>{
    try{
        var user1 = new userCollection({
            name : "abc",
            age :21,
            title:"student",
            location:"hyderabad",
            phone:123456,
        })
        var user2 = new userCollection({name : "def",
        age :23,
        title:"student",
        location:"kolkata",
        phone:123})
        var user3 = new userCollection({name : "ghi",
        age :25,
        title:"student",
        location:"warangal",
        phone:1236})
        result = []
        result.push(await user1.save())
        result.push(await user2.save())
        result.push(await user3.save())
       // console.log(result)
    }
    catch(err){
        console.log(err)
    }
}
userDoc()*/

const getDoc = async ()=>{
    try{
    const result = await userCollection.find({'age':{$gte:25}},{name:1,_id:0,age:1})
    console.log(result)
    }
    catch(err){
        console.log(err)
    }
}
getDoc()

const updateDoc = async (name)=>{
    try{
        const result = await userCollection.updateOne({name:name},{$set:{name:"charan"}})
        console.log(result)
    }
    catch(err){
        console.log(err)
    }
}
updateDoc("abc")

const delDoc = async (name)=>{
    try{
        const res = await userCollection.deleteOne({name})
        console.log(res)
    }
    catch(err){
        console.log(err)
    }
}
delDoc("charan")