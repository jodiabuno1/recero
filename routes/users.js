import express from "express";
import {
	getDataUser,
	getUserAndPassword,
	getTypeWaste,
	getContainer,
} from "../data/bbdd.js";
import comparePassword from "../utils/comparePassword.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	next();
});

router.get("/", async (req, res) => {
	const data = await getTypeWaste();
	res.render("User", { data: JSON.stringify(data) });
});
router.get("/data", async (req, res) => {
	const { authorization } = req.headers;
	try {
		const userToken = authorization.split(" ")[1] ?? false;
		if (!userToken) {
			throw new Error("no autorizado");
		}
		const { Rut_Num_Usuario, Contrasena_Perfil } = verifyToken(userToken);
		const responseDatabase = await getUserAndPassword(Rut_Num_Usuario);
		if (!responseDatabase) {
			const errorcillo = JSON.stringify({
				message: "Forbiden",
				status: 401,
			});
			throw new Error(errorcillo);
		}
		const isValid = await comparePassword(
			Contrasena_Perfil,
			responseDatabase.Contrasena_Perfil
		);
		if (!isValid) {
			const errorcillo = JSON.stringify({
				message: "Forbiden",
				status: 401,
			});
			throw new Error(errorcillo);
		}
		const dataUser = await getDataUser(responseDatabase.Rut_Num_Usuario);
		const container = await getContainer(dataUser.Id_Contenedor);
		res.send({data:dataUser,container: container});
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Error");
	}
});

export default router;
