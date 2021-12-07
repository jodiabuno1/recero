import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config(); // permite leer variables de entorno

export const sendMail = async(token,email) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail' ,
    auth: {
    user: process.env.EMAIL ,
    pass: process.env.PASSWORD_EMAIL ,
    },
  }) // crea objeto para enviar correos
  let mailOptions = {
    from:  process.env.EMAIL,
    to: email ,
    subject: 'Verifica tu correo' ,
    html: `<h1>Verifica tu correo haciendo click <a href="http://localhost:3000/accounts/verify?token=${token}">Aquí</a></h1>` ,
    } //configuración correo
    try {      
      transporter.sendMail(mailOptions) //envía correo
    } catch (error) {
      const errorcillo = JSON.stringify({message: "Algo Falló", status:500})
      throw new Error(errorcillo)
    }
}

