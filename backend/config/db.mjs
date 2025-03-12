import mongoose from "mongoose";


let connectDB = async() => {

  try {
    const DB_OPTIONS = {
      dbName : 'passportjsauth'
    }
    await mongoose.connect(process.env.MONGO_URI,DB_OPTIONS)
    console.log("Database connected")
  } catch (error) {
    console.log("DB Error : ",error)
  }
}

export default connectDB