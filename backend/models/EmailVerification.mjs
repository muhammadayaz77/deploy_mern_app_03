import mongoose from "mongoose";


let emailVerificationSchema = mongoose.Schema({
  userId : {
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref : 'user',
  },
    email : {
      type : String,
      unique : true,
      require : true
    },
    otp : {
      type : Number,
      require : true
    },
    createdAt : {
      type : Date,
      default : Date.now,
      expires : '15m'
    }

})

const EmailVerificationModel = mongoose.model('EmailVerification',emailVerificationSchema)

export default EmailVerificationModel;