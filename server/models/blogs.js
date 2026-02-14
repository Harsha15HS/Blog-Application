import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
    title:{
        type: String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    authId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});
const Blog = mongoose.model("Blogs", blogSchema);

export default Blog;