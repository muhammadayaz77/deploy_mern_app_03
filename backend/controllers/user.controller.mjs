import userModel from '../models/userModel.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerficationCode } from '../config/Email.mjs';


export const userRegistration = async(req,res) => {
  try {

    let {name,email,password,password_confirmation} = req.body;

    if(!name || !email || !password || !password_confirmation)
    {
      return res.status(400).json({
        message : "All fields are required",
        success : false
      })
    }
    if(password !== password_confirmation)
    {
      return res.status(400).json({
        message : "Password do not match",
        success : false
      })
    }

    let existingUser = await userModel.findOne({email});
    if(existingUser)
    {
      return res.status(400).json({
        message : "User Already registered",
        success : false
      })
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    let hashedPassword = await bcrypt.hash(password,salt);
   
    let newUser = await userModel.create({
      name,
      email,
      password : hashedPassword
    })
    sendVerficationCode(req,newUser);
    return res.status(200).json({
      message : "User Created Successfully!!!",
      success : true,
      user : {
        id : newUser._id,
        email : newUser.email,
      }
    })
    
  } catch (error) {
    return res.status(500).json({
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
    sameSite: "none",
    secure : "production"
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

export const logout = async(req,res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(404).cookie("token", "", { maxAge: 0 }).json({
      message: error.message,
      success: false,
    });
  }
}

export const updateProfile = async(req,res) => {
  try {
    let userId = req.userId;
    let user = await userModel.findByIdAndUpdate(userId,req.body,{new:true});
    return res.status(200).json({
      user,
      message : 'Profile Updated successfully!!!',
      success : true
    })
  } catch (error) {
    return res.status(404).json({
      message : error.message,
      success : false
    })
  }
}