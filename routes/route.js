import express from 'express';
import { addProfile, loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/addProfile', addProfile);

export default router;
