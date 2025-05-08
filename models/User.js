const mongoose = require("mongoose");
const {isEmail, isStrongPassword}=require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide name"],
        },
        email: {
            type: String,
            required:[true, "Please provide email"],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: isEmail,
                message: "{VALUE} is not a valid email",
            },
        },
        password: {
            type: String,
            required: [true, "Please provide password"],
            validate: {
                validator: isStrongPassword,
                message: "Please enter a strong password",
            },
            minlength: 8,
        },
        institute: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: {
                values: ["user", "admin"],
                message: `{VALUE} is not a valid role`,
            },
            default: "user",
        },
    },
    { timestamps: true }
);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "1d",
    });
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const passwordHash = this.password;
    const isPasswordMatch = await bcrypt.compare(password, passwordHash);
    return isPasswordMatch;
}


const User = mongoose.model("User", userSchema);
module.exports = User;