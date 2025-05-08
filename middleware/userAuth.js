const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new AppError("Please login", 401);
        }
        const {_id} = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await User.findById(_id);
        if(!user){
            throw new AppError("User not found", 404);
        }
        req.user = user;
        next();
    }catch(err){
        next(err);
    }
}

module.exports = userAuth;