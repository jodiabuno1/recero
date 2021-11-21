import express from "express";
import { createUser, getCounties, getKeyPassPerfil, verifyKeyPerfil } from "../data/bbdd.js";
import hashPassword from "../utils/hashPassword.js";
import { sendMail } from "../utils/mailer.js";
import signToken from "../utils/signToken.js";
import verifyToken from "../utils/verifyToken.js"
const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	next();
});

router.get("/verify",async(req,res)=>{
  const {token} = req.query
  try {
    
    const isVerifyAccount = verifyToken(token)
    if(isVerifyAccount){
      console.log("VERIFIED!")
      const asdf = await verifyKeyPerfil(isVerifyAccount)
      if(asdf === 0){
        console.log("Wrong Credentials")
        throw new Error("Wrong Credentials")
      }
      res.render("Verified",{
        verified: true
      })
    }else{
      throw new Error("NOT VERIFIED!")
    }
  } catch (error) {
    console.log(error.message)    
    res.render("Verified",{
      verified: false
    })
  }
  
})

export default router