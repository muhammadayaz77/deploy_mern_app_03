import userModel from "../models/userModel.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const register = async(req,res) => {
  try {

    let {fullname,email,password,role} = req.body;

    let userExist = await userModel.findOne({email});
    if(userExist)
    {
      return res.status(400).json({
        message : "User Already registered",
        success : false
      })
    }
    let hashedPassword = await bcrypt.hash(password,10);
    let user = await userModel.create({
      fullname,
      email,
      password : hashedPassword,
      role,
    })
    return res.status(200).json({
      message : "User Created Successfully!!!",
      success : true
    })
    
  } catch (error) {
    return res.status(404).json({
      message : error.message,
      success : false
    })
  }
}

export const login = async(req,res) => {
  try {
    let {email,password,role} = req.body;

    let user = await userModel.findOne({email});
    if(!user)
    {
      return res.status(400).json({
        message : "User not found",
        success : false
      })
    }
    let is_match = await bcrypt.compare(password,user.password);
    
    if(!is_match)
    {
      return res.status(400).json({
      message : 'Invalid Credentials!!!',
      success : false
      })
    }
    if(user.role !== role){
      return res.status(400).json({
        message : 'Role Not Match!!!',
        success : false
        })
    }

    let token = jwt.sign({
      userId : user._id,
      role : user.role
    },
    process.env.SECRET,
    {
      expiresIn : '1h'
    }
  
  )
  return res
  .status(200)
  .cookie("token", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure : false
  })
  .json({
    message: `Welcom back ${user.fullname}`,
    user,
    success: true,
  });

    
  } catch (error) {
    return res.status(404).json({
      message : error.message,
      success : false
    })
  }
}