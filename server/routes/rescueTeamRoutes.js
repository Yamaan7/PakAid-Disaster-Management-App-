import express from 'express';
import { registerRescueTeam } from '../controllers/rescueTeamController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/register',
    upload.fields([
        { name: 'certificate', maxCount: 1 },
        { name: 'profilePicture', maxCount: 1 }
    ]),
    registerRescueTeam
);

export default router;