const asyncHandler = require("express-async-handler");
const Comment = require("../model/commentModel");


const getComment = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(404)
        throw new Error("Can't find any Post")
    }
    const comment = await Comment.findOne(req.params.id);
    res.status(200).json({ comment })
});

const getComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find();
    if (comments) {
        res.status(200).json(comments)
    }
    else {
        res.status(404)
        throw new Error("Can't find any Posts")
    }

});

const createComment = asyncHandler(async (req, res) => {
    const { content, postId } = req.body;
    if (!content) {
        res.status(400);
        throw new Error("invalid request");
    }
    const id = req.id;
    const date = new Date().toISOString();

    const comment = await Comment.create({
        content, userId: id, addedDate: date, postId: postId
    });
    res.status(201).json({ comment });
});

const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        res.status(404)
        throw new Error("comment not found")
    }
    await Comment.deleteOne();
    res.json(comment).status(200);
});

const updateComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        res.status(404)
        throw new Error("comment not found")
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(400).json(updatedComment)
})


const likeComment = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw new Error("Bad Request, can't find any comment with the give ID")
    }
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
        res.status(404)
        throw new Error("comment not found")
    }
    const user = req.user.id;
    console.log(user)
    const likesArray = comment.likes;
    if(likesArray.includes(user)){
        const index = likesArray.indexOf(user);
        likesArray.splice(index, 1); 
    }
    else{
        likesArray.push(user);
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {likes:likesArray},
        { new: true }
    );
    res.status(200).json({likes:likesArray.length})
})


module.exports = {
    getComment,
    getComments,
    createComment,
    deleteComment,
    updateComment,
    likeComment
}