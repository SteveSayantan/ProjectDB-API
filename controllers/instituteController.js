const { StatusCodes } = require("http-status-codes");
const Institute = require("../models/Institute");
const NotFoundError = require("../errors/not-found");

const getAllInstitutes= async (req,res)=>{
    const {name,role}=req.query;
    const queryObj={}

    if(name){
        queryObj.name= {$regex:name,$options:'i'}
    }
    if(role){
        queryObj.role=role
    }

    const institutes= await Institute.find(queryObj).select('-password')

    res.status(StatusCodes.OK).json({institutes,count:institutes.length});
}

const getSingleInstitute= async (req,res)=>{
    
    const institute= await Institute.findOne({_id:req.params.id}).select('-password')

    if(!institute){
        throw new NotFoundError(`No institute with id ${req.params.id}`);
    }

    res.status(StatusCodes.OK).json({institute});
}

const createInstitute=async (req,res)=>{
    const institute= await Institute.create(req.body);
    res.status(200).json({institute:{name:institute.name}});
}

const deleteInstitute=(req,res)=>{
    res.status(200).send("Delete an Institute");
}

module.exports={getAllInstitutes,getSingleInstitute,createInstitute,deleteInstitute}