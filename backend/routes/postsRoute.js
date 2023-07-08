const express = require("express");
const {getPosts,getPost,getPostsUser, createPost, deletePost, updatePost, likePost}= require("../controllers/postsController");
const router = express.Router();
const validateToken = require("../middleware/validateToken");

router.use(validateToken)

router.get("/", getPosts); // api/posts/

router.get("/:postId", getPost); // api/posts/

router.get("/userPosts", getPostsUser); // api/userPosts/

router.post("/", createPost);// api/posts/
// title, content, images, 

router.put("/updatePost/:id", updatePost);

router.put("/likePost/:id", likePost);

router.delete("/:id", deletePost);// api/posts/

module.exports = router;