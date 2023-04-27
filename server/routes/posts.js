import express from 'express';

import { verifyToken } from '../middleware/auth.js';
import { getAllPosts, getUserPosts, handleLike } from '../controllers/posts.js';

const router = express.Router();

// READ;
router.get("/", verifyToken, getAllPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

// UPDATE
router.patch('/:id/like', verifyToken,  handleLike);

export default router;