import express from 'express';
import { verifyAuth } from '../middleware/authMiddleware.js';
import { handleCreateBlogs, handleDeleteBlogs, handleGetAllBlogs, handleSearchBlogs, handleUpdateBlogs, handleGetMyBlogs } from '../controllers/blogsController.js';
import Blog from '../models/blogs.js';

const route = express.Router();

route.post("/createBlogs", verifyAuth, handleCreateBlogs);
route.get("/getAllblogs",verifyAuth, handleGetAllBlogs);
route.get("/getMyBlogs", verifyAuth, handleGetMyBlogs);
route.post("/updateBlogs", verifyAuth,handleUpdateBlogs);
route.post("/deleteBlogs", verifyAuth, handleDeleteBlogs);
route.get("/getBlog/:id", verifyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate('authId', 'username email');
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ blog });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog", error: err.message });
  }
});
route.get("/searchBlogs", verifyAuth, handleSearchBlogs);


export default route;