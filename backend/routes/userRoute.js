const express = require("express");
const router = express.Router();
const {createUser, loginUser, updateUser, deleteUser, viewProfileUsername, followUserHandler, checkIfAllIsOK} = require("../controllers/userController")
const validateToken = require("../middleware/validateToken");

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/check/:id", validateToken, checkIfAllIsOK)

router.get("/profile/:username", viewProfileUsername);

router.put("/update/" , validateToken, updateUser);

router.get("/follow/:toFollowId", validateToken, followUserHandler)

router.delete("/delete", validateToken, deleteUser)

module.exports = router