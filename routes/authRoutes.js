const express = require("express");
const userAuth = require("../middleware/userAuth");
const router = express.Router();
const {
    login,
    signup,
    logout,
    deleteUser,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", userAuth, logout);
router.post("/delete", userAuth, deleteUser);

module.exports = router;
