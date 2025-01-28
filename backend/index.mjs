import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.mjs'
import dotenv from 'dotenv'
import connectDB from './config/db.mjs';
dotenv.config();
connectDB()

let app = express();

app.use(express.json())
app.use(cors())

let PORT = process.env.PORT || 3000

app.use('/user',userRoutes);

app.listen(PORT,() => {
  console.log('http://localhost:3000');
})