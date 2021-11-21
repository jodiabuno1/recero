import express from "express";
import {
	verifyKeyPerfil,
	enablePerfil,
	getUserAndPassword,
} from "../data/bbdd.js";
import comparePassword from "../utils/comparePassword.js";
import signToken from "../utils/signToken.js";

const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	next();
});

router.get("/", (req, res) => {
	res.render("Login");
});

router.post("/verify", async (req, res) => {
	try {
		const { Rut_Num_Usuario, Contrasena_Perfil } = req.body;
		const responseDatabase = await getUserAndPassword(
			Rut_Num_Usuario
		);
    if (!responseDatabase){
      const errorcillo = JSON.stringify({message: "Usuario o contraseña erróneos", status:401})
      throw new Error(errorcillo)
    }
		const isRightPass = await comparePassword(Contrasena_Perfil, responseDatabase.Contrasena_Perfil);
		console.log(isRightPass)
    if (!isRightPass) {
      const errorcillo = JSON.stringify({message: "Usuario o contraseña erróneos", status:401})
			throw new Error(errorcillo)
		}
    const token = signToken({Rut_Num_Usuario,Contrasena_Perfil})
    if(!token){
      const errorcillo = JSON.stringify({message: "Internal Error", status: 500})
      throw new Error(errorcillo)
    }
		res.send({token});
	} catch (error) {
    const messageRaw = error.message
    const {message,status} = JSON.parse(messageRaw)
    if(message && status){
      res.status(status).send(message)
    }else{
      res.status(500).send("Internal error");
    }
	}
});

export default router;
