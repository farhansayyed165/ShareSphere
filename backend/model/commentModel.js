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
    addedDate:{
        type:Date,
        required:true,
    },
    username: { type:String,required:true },
    user:{type:String, required:true}
},
{
    timestamps: true,
});

module.exports = mongoose.model("comment", commentSchema)