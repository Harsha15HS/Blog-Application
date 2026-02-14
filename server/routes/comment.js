import express from 'express';
import { verifyAuth } from '../middleware/authMiddleware.js';
import { handleCreateComment, handleGetComments, handleDeleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.post("/", verifyAuth, handleCreateComment);
router.get("/getComments/:blogId", verifyAuth, handleGetComments);
router.delete("/deleteComment/:commentId", verifyAuth, handleDeleteComment);

export default router;