import express from 'express';
import { addProfile, loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

// roure for user registration
router.post('/register', registerUser);

// route for user login
router.post('/login', loginUser);

// route for user login add profile and add banner
router.patch('/addProfile', addProfile);

export default router;
