import express from 'express'
import { getData } from '../controllers/getData.mjs';

let routes = express.Router();


routes.get('/ping',getData);

export default routes;