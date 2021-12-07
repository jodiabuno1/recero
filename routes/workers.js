import express from "express";
import {
	getUserAndPassword,
	getEnabledRouteByWorker,
	getWorker
} from "../data/bbdd.js";
import comparePassword from "../utils/comparePassword.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get("/", async (req, res) => {
	res.render("Worker");
});
router.get("/data", async (req, res) => {
	const { authorization } = req.headers;
	try {
		const userToken = authorization.split(" ")[1] ?? false;
		if (!userToken) {
			throw new Error("No autorizado");
		}
		const { Rut_Num_Usuario, Contrasena_Perfil } =
			verifyToken(userToken);
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
		const data = await getWorker(responseDatabase.Id_Perfil)
		const routes = await getEnabledRouteByWorker(responseDatabase.Id_Perfil)
		res.send({ routes,data, Descripcion_Perfil: responseDatabase.Descripcion_Perfil });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Error");
	}
});

export default router;
