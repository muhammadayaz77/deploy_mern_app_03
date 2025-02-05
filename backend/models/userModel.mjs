import mongoose from "mongoose";


let userSchema = mongoose.Schema({
  fullname : {
    type:String,
    require:true
  },
  email : {
    type:String,
    unique:true,
    require:true
  },
  password : {
    type:String,
    require:true
  },
  fullname : {
    type:String,
    require:true
  },
  role : {
    type : String,
    enum : ['student','teacher','admin'],
    require : true
  },
  aboutMe : {
    type : String,
  },
  profilePic : {
    type : String,
  }
})

const userModel = mongoose.model('User',userSchema)

export default userModel;