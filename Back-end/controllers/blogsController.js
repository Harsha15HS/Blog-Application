import Blog from '../models/blogs.js';

const handleCreateBlogs = async (req, res) => {
    const body = req.body;
    const user = req.user;
    if (body.title && body.description) {
        const blog = new Blog({ title: body.title, description: body.description, authId: user.userID });
        await blog.save();

        return res.status(201).json({ message: "new blog created", blog });
    } else {
        return res.status(400).json({ message: "title and description are required" });
    }

}
const handleGetAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const totalBlogs = await Blog.countDocuments();

        const blogs = await Blog.aggregate([
            {
                $lookup: {
                    from: "comments",          // collection name in MongoDB
                    localField: "_id",         // blog _id
                    foreignField: "blogId",    // blogId in Comment schema
                    as: "comments"
                }
            },
            {
                $addFields: {
                    commentCount: { $size: "$comments" }
                }
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
        ]);

        res.status(200).json({
            blogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: "error fetching blogs" });
    }
}



const handleUpdateBlogs = async (req, res) => {
    const body = req.body;
    const userID = req.user.userID;
    
    if (body.title && body.description && body.blogId) {
        try {
            const blog = await Blog.findById(body.blogId);
            
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            
            if (blog.authId.toString() !== userID) {
                return res.status(403).json({ message: "You are not authorized to update this blog" });
            }
            
            const updatedBlog = await Blog.findByIdAndUpdate(body.blogId, { title: body.title, description: body.description }, { new: true, runValidators: true });
            return res.status(200).json({ message: "blog updated successfully", blog: updatedBlog });
        } catch (err) {
            return res.status(500).json({ message: "Error updating blog", error: err.message });
        }
    } else {
        return res.status(400).json({ message: "title, description and blogId are required" });
    }
}
const handleDeleteBlogs = async (req, res) => {
    const body = req.body;
    const userID = req.user.userID;
    
    if (body.blogId) {
        try {
            const blog = await Blog.findById(body.blogId);
            
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            
            if (blog.authId.toString() !== userID) {
                return res.status(403).json({ message: "You are not authorized to delete this blog" });
            }
            
            await Blog.findByIdAndDelete(body.blogId);
            return res.status(200).json({ message: "blog deleted successfully" });
        } catch (err) {
            return res.status(500).json({ message: "Error deleting blog", error: err.message });
        }
    } else {
        return res.status(400).json({ message: "blogId is required" });
    }
}
const handleSearchBlogs = async (req, res) => {
    try {
        const query = req.query.query;
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        });
        return res.status(200).json({ blogs });
    } catch (err) {
        res.status(500).json({ message: "Search failed" });
    }
}

const handleGetMyBlogs = async (req, res) => {
    try {
        const userID = req.user.userID;
        const blogs = await Blog.find({ authId: userID }).sort({ createdAt: -1 });
        res.status(200).json({ blogs });
    } catch (err) {
        res.status(500).json({ message: "Error fetching user blogs", error: err.message });
    }
}

export {
    handleCreateBlogs,
    handleGetAllBlogs,
    handleUpdateBlogs,
    handleDeleteBlogs,
    handleSearchBlogs,
    handleGetMyBlogs
}