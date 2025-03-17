require('dotenv').config();
require('express-async-errors');

const express=require('express');
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app= express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("API for ProjectDB")
})


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
