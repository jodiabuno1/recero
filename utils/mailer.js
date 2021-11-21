import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

export const sendMail = async(token,email) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail' ,
    auth: {
    user: process.env.EMAIL ,
    pass: process.env.PASSWORD_EMAIL ,
    },
  })
  let mailOptions = {
    from:  process.env.EMAIL,
    to: email ,
    subject: 'Verifica tu correo' ,
    html: `<h1>Verifica tu Correo haciendo click <a href="http://localhost:3000/accounts/verify?token=${token}">Aquí</a></h1>` ,
    }
    try {      
      transporter.sendMail(mailOptions)
    } catch (error) {
      console.log("error mail",error)
    }
}

