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
		const asdf = await createUser(data);
		const [{ Rut_Num_Usuario, Contrasena_Perfil }] = await getKeyPassPerfil(
			data.Rut_Num_Usuario
		);
		const token = signToken({ Rut_Num_Usuario, Contrasena_Perfil });
		await sendMail(token, data.Correo_Usuario);
		res.send({
			dataRecieved: data,
			dataSended: "enviaste correctamente, te mando un token",
		});
	} catch (error) {
		console.log("error", error);
		res.status(500).send("Internal Error");
	}
});
export default router;
