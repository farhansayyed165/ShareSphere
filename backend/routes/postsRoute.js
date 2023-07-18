const express = require("express");
const {getPosts,getPost,getPostsUser, createPost, deletePost, updatePost, likePost, addComment}= require("../controllers/postsController");
const router = express.Router();
const validateToken = require("../middleware/validateToken");



router.get("/getPost/:id", getPost); // api/posts/

router.post("/", validateToken,createPost);// api/posts/
// title, content, images, 

router.put("/updatePost/:id",validateToken, updatePost);

router.put("/createComment/",validateToken, addComment);

router.put("/likePost/:id", likePost);

router.delete("/:id", deletePost);// api/posts/

module.exports = router;