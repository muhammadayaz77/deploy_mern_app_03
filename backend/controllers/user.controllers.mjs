import User from "../models/user.model.mjs"
import bcrypt from 'bcrypt'



export const register = async (req,res) => {
  try {
    let {fullname,email,password} = req.body;
    if(!fullname || !email || !password){
      return res.status(401).json({
        message : "Something is missing",
        success : false
      })
    }
  let user = await User.findOne({email});
  if(user){
    return res.status(401).json({
      message : "User is already register",
      success : false
    })
  }
  let hashedPassword = await bcrypt.hash(password,10);
  let createdUser = await User.create({
    fullname,
    email,
    password : hashedPassword
  })
  res.status(200).json({
    message : 'User created Successfully',
    createdUser,
    success : true
  })
  } catch (error) {
    return res.status(404).json({
      message : error.message,
      success : false
    })
  }
}