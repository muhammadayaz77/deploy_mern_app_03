import express from 'express'
import { getData } from '../controllers/user.controller.mjs';

let router = express.Router();


router.get('/ping',getData)


export default router;