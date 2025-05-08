const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 3600000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
};

module.exports = cookieOptions;
