import express from 'express'
import { register } from '../controllers/user.controllers.mjs';

let routes = express.Router();


routes.post('/register',register);

export default routes;