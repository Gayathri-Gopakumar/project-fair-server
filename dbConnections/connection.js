const mongoose=require('mongoose')

const dbConnection=process.env.CONNECTION_STRING

mongoose.connect(dbConnection).then(res=>{
    console.log("mongoDB atlas connected successfully with pfServer");
}).catch(err=>{
    console.log("connection failed");
    console.log(err);
})