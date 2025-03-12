import express from 'express'
import { login, logout, updateProfile, userRegistration } from '../controllers/user.controller.mjs';
import isAuthenticated from '../middleware/isAuthenticated.mjs'

let router = express.Router();


router.post('/register',userRegistration)
router.post('/login',login)
router.get('/logout',logout)
router.post('/update/profile',isAuthenticated,updateProfile)


export default router;