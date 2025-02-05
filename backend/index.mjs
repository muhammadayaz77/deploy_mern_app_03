import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.mjs'
import classroomRoutes from './routes/classroomRoutes.mjs'
import testAttemptRoutes from './routes/testAttemptRoutes.mjs'
import dotenv from 'dotenv'
import connectDB from './config/db.mjs';
import cookieParser from 'cookie-parser';
dotenv.config();
connectDB()

let app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend origin
  credentials: true, 
}))

let PORT = process.env.PORT || 3000

app.use('/user',userRoutes);
app.use('/admin',classroomRoutes);
app.use('/test',testAttemptRoutes);

app.listen(PORT,() => {
  console.log('http://localhost:3000');
})