const express = require("express");
const {getPosts,getPost, createPost, deletePost, updatePost, likePost, addComment, savePost, getUserPosts}= require("../controllers/postsController");
const router = express.Router();
const validateToken = require("../middleware/validateToken");



router.get("/getPost/:id", getPost); // api/posts/             //GET

router.get("/getUserPosts/:id", getUserPosts); // api/posts/    //GET

router.post("/", validateToken,createPost);// api/posts/       //POST
// title, content, images, 

router.put("/updatePost/:id",validateToken, updatePost);       //PUT

router.put("/createComment/",validateToken, addComment);       //PUT

router.put("/save/:postId", validateToken, savePost)           //PUT

router.put("/likePost/:id", likePost);                         //PUT

router.delete("/:id", deletePost);// api/posts/                //DELETE

module.exports = router;