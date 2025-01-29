import express from 'express'
import { createClassroom, getAllClassrooms, getClassrooms } from '../controllers/classroom.controller.mjs';
import isAuthenticated from '../middleware/isAuthenticated.mjs';
import { createQuestion } from '../controllers/question.controller.mjs';

let router = express.Router();


router.post('/create-classroom',isAuthenticated,createClassroom)
router.post('/create-question',isAuthenticated,createQuestion)
router.get('/get-classroom-by-id/:id',isAuthenticated,getClassrooms)
router.get('/get-all-classroom',isAuthenticated,getAllClassrooms)


export default router;