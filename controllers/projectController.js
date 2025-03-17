const getAllProjects=(req,res)=>{
    res.status(200).send("Get all projects");
}

const getSingleProject=(req,res)=>{
    res.status(200).send("Get a project");
}

const createProject=(req,res)=>{
    res.status(200).send("Create a project");
}

const deleteProject=(req,res)=>{
    res.status(200).send("Delete a project");
}

const updateProject=(req,res)=>{
    res.status(200).send("Update a project");
}

module.exports={getAllProjects,getSingleProject,createProject,deleteProject,updateProject}