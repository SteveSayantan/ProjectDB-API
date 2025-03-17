const getAllInstitutes=(req,res)=>{
    res.status(200).send("Get all Institutes");
}

const getSingleInstitute=(req,res)=>{
    res.status(200).send("Get an Institute");
}
const createInstitute=(req,res)=>{
    res.status(200).send("Create an Institute");
}
const deleteInstitute=(req,res)=>{
    res.status(200).send("Delete an Institute");
}

module.exports={getAllInstitutes,getSingleInstitute,createInstitute,deleteInstitute}