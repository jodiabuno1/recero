import express from "express";
import {
	getUserAndPassword,
  createRoute,
	getAllRoutes,
	addWorker,
	getAllWorkers,
	updateIdWorkerRoute,
} from "../data/bbdd.js";
import comparePassword from "../utils/comparePassword.js";
import hashPassword from "../utils/hashPassword.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.use(async(req, res, next) => {
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
		if(responseDatabase.Descripcion_Perfil === "User"){
			const errorcillo = JSON.stringify({
				message: "Forbiden",
				status: 401,
			});
			throw new Error(errorcillo);
		}
		next()
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Error");
	}
});
router.get("/",async(req,res)=>{
	const routes = await getAllRoutes()
	res.status(200).send(routes)
})
router.post("/", async (req, res) => {
	const {data} = req.body
  try {
    await createRoute(data)
    res.status(201).send("Ruta creada con éxito")
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

router.get("/workers",async(req,res)=>{
	const data = await getAllWorkers()
	res.status(200).send(data)
})
router.post("/workers",async(req,res)=>{
	const data = req.body
	try {
		data.Contrasena_Perfil = await hashPassword(data.Contrasena_Perfil);
		const {Rut_Num_Usuario,
			Nombres_Usuario,
			Apellido_Paterno,
			Apellido_Materno,
			Correo_Usuario,
			Contrasena_Perfil} = req.body
		const createdUser = await addWorker({
				Rut_Num_Usuario,
        Nombres_Usuario,
        Apellido_Paterno,
        Apellido_Materno,
        Id_Direccion: 13121,
        Fecha_Nacimiento: "01-01-2021",
        Correo_Usuario,
        Contrasena_Perfil,
		})
		res.status(201).send("Trabajador inscrito")
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
})

router.patch("/",async(req,res)=>{
	const {idRoute,idWorker} = req.body
	try {
		const isAssignWorkerToRoute = await updateIdWorkerRoute({idWorker,idRoute})
		if(isAssignWorkerToRoute){
			res.status(201).send("modificado correctamente")
		}else{
			res.status(400).send("fallo")
		}
	} catch (error) {
		console.log(error)
	}
})

export default router;
