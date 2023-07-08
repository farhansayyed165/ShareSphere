const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const {getComment, getComments,createComment,deleteComment, updateComment, likeComment} = require("../controllers/commentController");

router.use(validateToken);

router.get("/", getComments);

router.get("/:id", getComment);

router.post("/", createComment);

router.put("/update", likeComment);

router.put("/like/:id", likeComment);

router.delete("/:id", deleteComment);

module.exports = router;