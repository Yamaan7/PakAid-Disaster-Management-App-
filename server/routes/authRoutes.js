import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// Single login endpoint for all user types
router.post('/login', login);

export default router;