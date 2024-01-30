import express from 'express'

import {
    regUser , 
    logoutUser , 
    getUserProfile ,
    updateUserProfile
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

import { authUser } from "../controllers/userController.js";


router.post('/',regUser);
router.post('/auth',authUser)
router.post('/logout',logoutUser);
router.route('/profile').get(protect ,getUserProfile).put(protect,updateUserProfile);

export default router;