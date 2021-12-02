import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const signToken = (data) => 
  jwt.sign(data,process.env.PRIVATE_KEY)

export default signToken