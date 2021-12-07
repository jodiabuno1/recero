import express from "express";
import {
	createUser,
	getCounties,
	getKeyPassPerfil,
} from "../data/bbdd.js";
import hashPassword from "../utils/hashPassword.js";
import { sendMail } from "../utils/mailer.js";
import signToken from "../utils/signToken.js";
const router = express.Router();

//middleware
router.use((req, res, next) => {
	next();
});

router.get("/", async (req, res) => {
	let counties = await getCounties(); //obtiene comunas de bbdd
	// renderiza vista de registro y le envía el arreglo de comunas
	res.render("Register", {
		counties,
	});
});
router.post("/", async (req, res) => {
	const data = req.body; // obtiene data desde navegador
	try {
		data.Contrasena_Perfil = await hashPassword(data.Contrasena_Perfil); // hash contraseña
		await createUser(data); // crea usuario
		const [{ Rut_Num_Usuario, Contrasena_Perfil }] = await getKeyPassPerfil(
			data.Rut_Num_Usuario
		); // obtiene rut y pass desde tabla perfil
		const token = signToken({ Rut_Num_Usuario, Contrasena_Perfil }); // genera Json Web Token
		await sendMail(token, data.Correo_Usuario); // se envía correo a usuario con link a ruta de verificación y el token
		res.send("Registro exitoso");
	} catch (error) {
		console.log(error)
		const messageRaw = error.message
    const {message,status} = JSON.parse(messageRaw)
    if(message && status){
			console.log(message, status)
      res.status(status).send(JSON.stringify(message))
    }else{
      res.status(500).send("Internal error");
    }
	}
});
export default router;
