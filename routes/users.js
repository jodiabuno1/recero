import express from "express";
import {
	getDataUser,
	getUserAndPassword,
	getCounties,
	getContainer,
} from "../data/bbdd.js";
import comparePassword from "../utils/comparePassword.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.use((req, res, next) => {
	next();
});

router.get("/", async (req, res) => {
	const data = await getCounties();
	res.render("User", { data: JSON.stringify(data) });
});
router.get("/data", async (req, res) => {
	const { authorization } = req.headers;
	try {
		const userToken = authorization.split(" ")[1] ?? false;
		if (!userToken) {
			throw new Error("no autorizado");
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
		const dataUser = await getDataUser(responseDatabase.Rut_Num_Usuario);
		const container = await getContainer(dataUser.Id_Contenedor);
		if(responseDatabase.Descripcion_Perfil === "Admin"){
			res.redirect(301,"../admin")
			return
		}else{
			console.log(dataUser,container)
			res.send({ data: dataUser, container: container, isAdmin:0 });
		}		
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Error");
	}
});

export default router;
