import express from "express";
import {
	isVerifiedAccount,
	getUserAndPassword,
  
} from "../data/bbdd.js";
import comparePassword from "../utils/comparePassword.js";
import signToken from "../utils/signToken.js";

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get("/", (req, res) => {
	res.render("Login");
});

router.post("/verify", async (req, res) => {
  //verifica credenciales
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
    if (!isRightPass) {
      const errorcillo = JSON.stringify({message: "Usuario o contraseña erróneos", status:401})
			throw new Error(errorcillo)
		}
    const {Is_Valid,Descripcion_Perfil} = await isVerifiedAccount(Rut_Num_Usuario)
    if(Is_Valid === 0){
      const errorcillo = JSON.stringify({message: "Cuenta sin verificar", status:401})
			throw new Error(errorcillo)
    }
    const token = signToken({Rut_Num_Usuario,Contrasena_Perfil})
    if(!token){
      const errorcillo = JSON.stringify({message: "Internal Error", status: 500})
      throw new Error(errorcillo)
    }
		res.send({token,Descripcion_Perfil});
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
