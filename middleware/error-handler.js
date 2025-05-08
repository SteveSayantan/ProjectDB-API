const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware=(err,req,res,next)=>{
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || "Something went wrong";
    res.status(statusCode).json({success: false, message: errorMessage});
}

module.exports=errorHandlerMiddleware;