import EmailVerificationModel from "../models/EmailVerificatin.mjs";
import { transporter } from "./Email.config.mjs";
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.mjs";


export const sendVerficationCode = async (req, user) => {
  try {
    if (!user || !user.email) {
      throw new Error("User email is missing or undefined!");
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpVerificationLink = `${process.env.FRONTEND_URL}/email/verify-email`;

    console.log(user);

    // Save the OTP in the database
    const emailVerification = await new EmailVerificationModel({
      userId: user._id,
      email: user.email,  // Ensure email is stored
      otp: otp,
    }).save();

    const info = await transporter.sendMail({
      from: `"GeOOOO 👻" ${process.env.EMAIL_FROM}`,
      to: user.email,
      subject: "OTP - Verify your account",
      text: "Verify your email",
      html: Verification_Email_Template.replace("{verificationCode}", otp),
    });

    console.log("Message sent: %s", info);
  } catch (error) {
    console.log("Email Error:", error);
  }
};



export const wellcomeEmail = async(email,name) => {
  try {
    const info = await transporter.sendMail({
      from: '"Muhammad Ayaz Company 👻" <muhammadayaz22757@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome to community!", // Subject line
      text: "Welcome to community", // plain text body
      html: Welcome_Email_Template.replace('{name}',name), // html body
    });
    console.log("Message sent: %s", info);
  } catch (error) {
    console.log("Email Error : ",error)
  }
}