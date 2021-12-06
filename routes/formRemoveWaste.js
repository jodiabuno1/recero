import express from "express";
import {
	getUserAndPassword,
	enableRoute,
	getEnableWeight,
	applyRemoveWastes
} from "../data/bbdd.js";
import comparePassword from "../utils/comparePassword.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.use(async (req, res, next) => {
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
		next();
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Error");
	}
});
router.post("/", async (req, res) => {
	const {
		Id_Direccion,
		Rut_Num_Usuario,
		Id_Ruta,
		vidrio,
		carton,
		papel,
		residuo_tecnologico,
		plastico,
		lugar_retiro,
		Id_Contenedor
	} = req.body;
	const data = await applyRemoveWastes({
		Id_Direccion,
		Rut_Num_Usuario,
		Id_Ruta,
		vidrio,
		carton,
		papel,
		residuo_tecnologico,
		plastico,
		lugar_retiro,
		Id_Contenedor
	})
	console.log("data",data)
	if(!data){
		res.status(500).send("Hubo un error")
		return
	}
	res.send("Ficha solicitada con éxito")
});
router.post("/verification", async (req, res) => {
	const { fecha, Rut_Num_Usuario } = req.body;
	try {
		const isEnableRoute = await enableRoute({ fecha, Rut_Num_Usuario });
		if (!isEnableRoute) {
			const errorcillo = JSON.stringify({
				message: "Bad",
				status: 400,
			});
			throw new Error(errorcillo);
		}
		res.send(`${isEnableRoute}`);
	} catch (error) {
		console.log("el error",error)
		const messageRaw = error.message;
		const { message, status } = JSON.parse(messageRaw);
		if (message && status) {
			console.log("Pasé por aqui")
			console.log(message, status);
			res.status(status).send(JSON.stringify(message));
		} else {
			res.status(500).send("Internal error");
		}
	}
});
router.post("/waste", async (req, res) => {
	const { fecha } = req.body;
	try {
		const usedWeight = await getEnableWeight(fecha);
		for (const key in usedWeight) {
			usedWeight[key] = 500 - usedWeight[key];
		}
		res.send(usedWeight);
	} catch (error) {
		const messageRaw = error.message;
		const { message, status } = JSON.parse(messageRaw);
		if (message && status) {
			console.log(message, status);
			res.status(status).send(JSON.stringify(message));
		} else {
			res.status(500).send("Internal error");
		}
	}
});

export default router;
