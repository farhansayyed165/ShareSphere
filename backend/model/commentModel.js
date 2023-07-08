const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"post"
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    addedDate:{
        type:Date,
        required:true,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("comment", commentSchema)