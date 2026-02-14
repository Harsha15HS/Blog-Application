import commentModel from "../models/comment.js";

const handleCreateComment = async (req, res) =>{
    const {blogId, text} = req.body;
    const userId = req.user.userID;
    console.log("REQ.USER:", req.user);

    try{
        if(!blogId || !text){
            return res.status(400).json({message: "blogId and text are required"});
        }
        //create comment
        const comment = await commentModel.create({
            blogId,
            userId,
            text
            });

            if(comment){
                return res.status(201).json({message: "Comment created successfully", comment});
            }else{
                return res.status(400).json({message: "Failed to create comment"});
            }

    }catch(err){
        return res.status(500).json({message: "internal server error", errorMessage: err.message});
    }
    
}
const handleGetComments = async(req, res)=>{
    const {blogId} = req.params;
    try{
        if(!blogId){
            return res.status(400).json({message: "blogId is required"});
        }
        const comments = await commentModel
        .find({blogId})
        .populate("userId", "username")
        .sort({createdAt: -1});

        return res.status(200).json({message: "comments fetched successfully", comments});
    }catch(err){
        return res.status(500).json({message: "internal server error", errorMessage: err.message});
    }
}
const handleDeleteComment = async(req,res)=>{
    const {commentId} = req.params;
    const userId = req.user.userID;
    try{
        if(!commentId){
            return res.status(400).json({message:" commentId is required"});
        }
        const comment = await commentModel
        .findById(commentId);

        if(!comment){
            return res.status(404).json({message: "comment not found"});
        }
        if(comment.userId.toString() !== userId && req.user.role !== "admin"){
            return res.status(403).json({message: "you are not authorized to delete this comment"});
        }
        await commentModel.findByIdAndDelete(commentId);
        return res.status(200).json({message: "comment deleted successfully"});
    }catch(err){
        return res.status(500).json({message: "internal server error", errorMessage: err.message});
    }
}
export{
    handleCreateComment,
    handleGetComments,
    handleDeleteComment
}