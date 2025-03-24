import express from 'express'
import { login, logout, refreshToken, updateProfile, userRegistration, verifyEmail } from '../controllers/user.controller.mjs';
import isAuthenticated from '../middleware/isAuthenticated.mjs'

let router = express.Router();


router.post('/register',userRegistration)
router.post('/email-verify',verifyEmail )
router.get('/refresh',refreshToken)
router.post('/login',login)
router.get('/logout',logout)
router.post('/update/profile',isAuthenticated,updateProfile)


export default router;