const validator = require("validator");
const AppError = require("./AppError");

function validateSignUpData(data) {
    if (!data.name || typeof data.name !== "string") {
        throw new AppError("Name is required", 400);
    }
    if (!data.email || !validator.isEmail(data.email)) {
        throw new AppError("Valid email is required", 400);
    }
    if (!data.password || data.password.length < 8) {
        throw new AppError("Password must be at least 8 characters long", 400);
    }
    if (!validator.isStrongPassword(data.password)) {
        throw new AppError(
            "Password should include at least 1 uppercase letter, 1 number and 1 symbol", 400
        );
    }
}

module.exports = validateSignUpData;
