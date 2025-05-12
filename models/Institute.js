const mongoose = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");
const bcrypt = require("bcrypt");

const InstituteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide the name of Institute"],
            maxLength: [60, "Name can not be more than 60 characters"],
            minLength: [10, "Name can not be less than 10 characters"],
            trim: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Please provide the email"],
            unique: true,
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
        },

        role: {
            type: String,
            enum: ["admin", "contributor"],
            default: "contributor",
        },
    },
    { timestamps: true }
);

InstituteSchema.methods.validatePassword = async function (password) {
    const passwordHash = this.password;
    const isPasswordMatch = await bcrypt.compare(password, passwordHash);
    return isPasswordMatch;
};

module.exports = mongoose.model("Institute", InstituteSchema);
