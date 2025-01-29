import express from 'express'
import { login, register } from '../controllers/user.controller.mjs';
import { submitTest } from '../controllers/testAttempt.controller.mjs';
import isAuthenticated from '../middleware/isAuthenticated.mjs';

let router = express.Router();


router.post('/test-attempt/:id',isAuthenticated,submitTest)


export default router;