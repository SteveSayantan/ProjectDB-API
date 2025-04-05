const UnauthenticatedError = require("../errors/unauthenticated");
const jwt=require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Error')
    }

    const token= authHeader.split(" ")[1]

    try {
        const {instituteId,name,role}= jwt.verify(token, process.env.JWT_SECRET)
        req.institute={instituteId,name,role}
        next();
        
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }

}


function authorizePermission(...roles){

    return function(req,res,next){

        if(!roles.includes(req.institute.role)){
            throw new UnauthenticatedError("Unauthorized to access this route");
        }

        next();
    }
}

module.exports={authMiddleware,authorizePermission};