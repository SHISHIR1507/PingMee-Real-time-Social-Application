import express from 'express';
import { login,signup,logout,onboard } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middlewares/auth.middleware.js';


const router = express.Router();

// Sign Up route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

router.post(`/onboarding`, protectRoute, onboard);

router.get("/loginCheck",protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});


export default router;