require('dotenv').config();
require('express-async-errors');

const express=require('express');
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter=require('./routes/authRoutes')
const projectRouter=require('./routes/projectRoutes')
const instituteRouter=require('./routes/instituteRoutes')

const app= express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("API for ProjectDB")
})

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/projects',projectRouter);
app.use('/api/v1/institutes',instituteRouter);

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
