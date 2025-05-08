const validator = require("validator");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const cookieOptions = require("../utils/cookieOptions");
const validateSignUpData = require("../utils/validateSignupData");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");

const signup = async (req, res, next) => {
    const userObj = req.body;
    try {
        validateSignUpData(userObj);

        userObj.password = await bcrypt.hash(userObj.password, 10);

        const user = new User(userObj);
        await user.save();

        const token = await user.getJWT();
        res.cookie("token", token, cookieOptions);

        const { password, ...safeUser } = user.toObject();
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User registered successfully",
            user: safeUser,
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!validator.isEmail(email)) {
            throw new AppError("Invalid email format", StatusCodes.BAD_REQUEST);
        }

        const user = await User.findOne({ email: email });
        if (!user || !(await user.validatePassword(password))) {
            res.clearCookie("token", null, { httpOnly: true });
            throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
        }

        const token = await user.getJWT();
        res.cookie("token", token, cookieOptions);

        const { password: _, ...safeUser } = user.toObject();
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Login successful",
            user: safeUser,
        });
    } catch (err) {
        next(err);
    }
};

const logout = (req, res, next) => {
    try {
        res.clearCookie("token", { httpOnly: true });
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    const { password } = req.body;
    try {
        const user = req.user;
        if(!(await user.validatePassword(password))){
            throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
        }
        await user.deleteOne();
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { signup, login, logout, deleteUser };
