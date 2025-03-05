const express=require('express');
const connectDB = require('./db/connect');
const app= express();
require('dotenv').config();

app.get("/",(req,res)=>{
    res.status(200).send("API for ProjectDB")
})

const port= process.env.PORT ?? 5000;

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start();
