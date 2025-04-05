const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");
const Institute = require("../models/Institute");

const login=async (req,res)=>{

    const {email,password}=req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide credentials');
    }

    const institute= await Institute.findOne({email});

    if(!institute){
        throw new UnauthenticatedError("Invalid credentials");
    }
    
    const isPasswordCorrect= await institute.comparePassword(password);
    
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid credentials");
    }

    const token= institute.createJWT();

    res.status(StatusCodes.OK).json({institute:{name:institute.name,role:institute.role},token})
}

module.exports={login};