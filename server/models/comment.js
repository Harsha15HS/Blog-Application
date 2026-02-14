import { text } from "express";
import mongoose from "mongoose";

const {Schema} = mongoose;

const commentSchema = new Schema({
    blogId:{
        type: Schema.Types.ObjectId,
        ref: "Blogs",
        required : true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "Users",
        required : true
    },
    text:{
        type : String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    },
    { timestamps: true }

);
const Comment = mongoose.model("Comments", commentSchema );

export default Comment;