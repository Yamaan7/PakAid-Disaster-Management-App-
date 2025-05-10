import express from 'express';
import { createBlog, getBlogs, getUserBlogs, getBlogById, deleteBlog, updateBlog, assignTeamToBlog } from '../controllers/blogController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), createBlog);
router.get('/', getBlogs);
router.get('/user/:authorName', getUserBlogs);
router.get('/:id', getBlogById);  // Fixed this line
router.delete('/:id', deleteBlog);
router.put('/:id', upload.single('image'), updateBlog);
router.post('/:blogId/assign-team', assignTeamToBlog);

export default router;