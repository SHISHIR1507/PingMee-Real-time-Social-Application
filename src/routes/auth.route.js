import express from 'express';
import { login,signup,logout } from '../controllers/auth.controllers.js';
const router = express.Router();

// Sign Up route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

export default router;