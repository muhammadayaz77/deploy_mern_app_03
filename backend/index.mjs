import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.mjs'
import dotenv from 'dotenv'
dotenv.config();

let app = express();

app.use(express.json())
app.use(cors())

let PORT = process.env.PORT || 3000

app.use('/user',userRoutes);

app.listen(PORT,() => {
  console.log('http://localhost:3000');
})