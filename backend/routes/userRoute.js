const express = require("express");
const router = express.Router();
const {createUser, loginUser, viewProfile, updateUser, deleteUser} = require("../controllers/userController")
const validateToken = require("../middleware/validateToken");

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/profile" , validateToken, viewProfile);

router.put("/update" , validateToken, updateUser);

router.delete("/delete", validateToken, deleteUser)

module.exports = router