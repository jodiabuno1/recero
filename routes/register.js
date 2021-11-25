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

router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
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
	const data = req.body;
	try {
		data.Contrasena_Perfil = await hashPassword(data.Contrasena_Perfil);
		await createUser(data);
		const [{ Rut_Num_Usuario, Contrasena_Perfil }] = await getKeyPassPerfil(
			data.Rut_Num_Usuario
		);
		const token = signToken({ Rut_Num_Usuario, Contrasena_Perfil });
		await sendMail(token, data.Correo_Usuario);
		res.send("Registro exitoso");
	} catch (error) {
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
