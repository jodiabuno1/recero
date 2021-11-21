import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const verifyToken = (token) => {
  return jwt.verify(token,process.env.PRIVATE_KEY)
}

export default verifyToken