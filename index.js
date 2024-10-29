const express=require('express')
const cors=require('cors')
require('dotenv').config()
const router=require('./routes/router')
require('./dbConnections/connection')

const pfServer=express()

pfServer.use(cors())

pfServer.use(express.json())

pfServer.use(router)

pfServer.use('/uploads',express.static('./uploads'))

const PORT=3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`pfServer has started at ${PORT} and is waiting for client request!!!`);
})

// resolving GET
pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">PFServer started and waiting for client request!!!</h1>`)
})

// resolving post
pfServer.post('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">PFServer received POST request!!!</h1>`)
})

// resolving PUT
pfServer.put('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">PFServer received PUT request!!!</h1>`)
})

// resolving delete 
pfServer.delete('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">PFServer received DELETE request!!!</h1>`)
})

