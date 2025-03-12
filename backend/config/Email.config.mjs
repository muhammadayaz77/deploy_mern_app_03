import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // Default to Gmail SMTP
  port: Number(process.env.EMAIL_PORT), // Use 587 if not set
  secure: process.env.EMAIL_PORT == "465", // Secure for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
});

// const sendEmail = async() => {
//   try {
//     const info = await transporter.sendMail({
//       from: '"GeOOOO 👻" <muhammadayaz22757@gmail.com>', // sender address
//       to: "yasir450.kk@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
  
//     console.log("Message sent: %s", info);
//   } catch (error) {
//     console.log(error)
//   }
// }
// sendEmail()