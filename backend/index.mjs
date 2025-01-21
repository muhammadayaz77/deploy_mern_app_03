import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs'
dotenv.config();
connectDB();
let app = express();
app.use(express.json());
app.use(cors());

app.use('/user',userRoutes);

app.listen(3000,()=>{
  console.log('http://localhost:3000')
})