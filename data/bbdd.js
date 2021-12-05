import MySQL from "mysql";
import dotenv from "dotenv";
import { promisify } from "util"; 
import {getDate} from "../utils/getDate.js"
dotenv.config(); // permite usar constantes de .env

let pool = MySQL.createPool({
	host: process.env.HOST_DATABASE,
	user: process.env.USER_DATABASE,
	port: 3306,
	password: process.env.PASSWORD_DATABASE,
	database: process.env.DATABASE,
}); // crea pool para solicitudes en MYSQL
pool.query = promisify(pool.query); // permite manejar callbacks como promesas (asincronía)

export const getCounties = async () => {
	const query = "select * from comunas";
	try {
		const data = await pool.query(query);
		const counties = data.map((e) => ({
			name: e.Nombre_Comuna,
			id: e.Id_Comuna,
		}));
		return counties;
	} catch (error) {
		console.log("ddbb", error);
	}
}; // Obtiene comunas de BBDD
export const createUser = async (dataValues) => {
  const {Contrasena_Perfil, ...data} = dataValues
  const newData = Object.values(data)
  const queryCreateUser = `INSERT INTO usuario values ?`
  const queryPerfil = "INSERT INTO perfil values (?)"
  const queryIdMaxPerfil = "Select max(Id_Perfil) as max from perfil"
  // create containers
  const initContainer = ""
  const queryCreateContainer = "INSERT INTO contenedor values (?)"
  const queryIdMaxCreateContainer = "Select max(Id_Contenedor) as max from contenedor"
  try {
    await pool.query("start transaction")
    const idMaxCreateContainer = await pool.query(queryIdMaxCreateContainer)
    const idMaxPerfil = await pool.query(queryIdMaxPerfil);
    
    await pool.query(queryCreateContainer,[[idMaxCreateContainer[0].max + 1 ?? 1,50,1,0,0,0,0,0]])
    // await pool.query(queryCreateContainer,[[1, 50,1,0,0,0,0,0]])
    console.log("max container",idMaxCreateContainer[0].max + 1 ?? 1)    
    await pool.query(queryCreateUser,[[[...newData,idMaxCreateContainer[0].max + 1 ?? 1]]])
    await pool.query(queryPerfil,[[idMaxPerfil[0].max + 1 ?? 1, "User", newData[0],0,getDate(),Contrasena_Perfil]])
    await pool.query("commit")
    console.log("USER CREATED!")
    return data
  } catch (error) {
    await pool.query("rollback")
    console.log(error)
    const errorcillo = JSON.stringify({message: "Usuario ya existe", status:404})
    throw new Error(errorcillo)
  }
} // crea usuario

export const getKeyPassPerfil = (rut) => {
  const query = "SELECT Rut_Num_Usuario, Contrasena_Perfil from perfil where Rut_Num_Usuario = ?"
  try {
    const data = pool.query(query,rut)
    return data
  } catch (error) {
    console.log(error)
  }
} // obtiene rut y contraseña según un rut de usuario solicitado

export const verifyKeyPerfil = async (data) => {
  const query = "SELECT Rut_Num_Usuario, Contrasena_Perfil from perfil where Rut_Num_Usuario = ? and Contrasena_Perfil = ?"
  try {
    const result = await pool.query(query,[data.Rut_Num_Usuario,data.Contrasena_Perfil])
    return result.length
  } catch (error) {
    console.log(error)
  }
} // consulta que verifica si rut y contraseña coinciden de forma bruta

export const enablePerfil = async (rut) => {
  const query = "UPDATE perfil SET Is_Valid = 1 where Rut_Num_Usuario = ?"
  try {
    const result = pool.query(query,rut)
    return result
  } catch (error) {
    console.log(error)
  }
} //habilita cuenta

export const getUserAndPassword = async(rut) => {
  const query = "SELECT Rut_Num_Usuario, Contrasena_Perfil, Descripcion_Perfil from perfil where Rut_Num_Usuario = ?"
  try {
    const result = await pool.query(query,rut)
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

export const isVerifiedAccount = async(rut) => {
  const query = "SELECT Is_Valid from perfil where Rut_Num_Usuario = ?"
  try {
    const result = await pool.query(query,rut)
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

export const getDataUser = async(rut) => {
  const query = "SELECT * from usuario where Rut_Num_Usuario = ?"
  try {
    const result = await pool.query(query,rut)
    return result[0]
  } catch (error) {
    console.log(error)
  }
}


export const getTypeWaste = async()=>{
  try {
    const result = await pool.query("SELECT * FROM residuos")
    return result
  } catch (error) {
    
  }
}

export const getContainer = async(id) => {
  try {
    const result = await pool.query("SELECT * FROM contenedor where Id_Contenedor = ?",id)
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

export const getAllContainers = async() => {
  try {
    const result = await pool.query("SELECT * FROM contenedor")
    return result
  } catch (error) {
    console.log(error)
  }
}

//CRUD RUTAS
export const getAllRoutes = async() => {
  try {
    const result = await pool.query("SELECT * FROM ruta_solicitada where fecha > now()")
    return result
  } catch (error) {
    console.log(error)
  }
}
export const createRoute = async(fecha) => {
  const queryIdMaxRoute = "Select max(Id_Ruta) as max from ruta_solicitada"
  const queryCreateRoute = "INSERT INTO ruta_solicitada values (?)"
  try {
    await pool.query("start transaction")
    const idMaxRoute = await pool.query(queryIdMaxRoute);
    await pool.query(queryCreateRoute,[[idMaxRoute[0].max + 1 ?? 1,"",fecha,0,1]])
    await pool.query("commit")
    return true
  } catch (error) {
    await pool.query("rollback")
    const errorcillo = JSON.stringify({
      message: "Ese día ya tiene una ruta, no se puede repetir",
      status: 400,
    });
    throw new Error(errorcillo);
  }
}

export const updateIdWorkerRoute = async(dataValues) => {
  const queryUpdateId = "UPDATE ruta_solicitada set Id_Trabajador = ? where Id_Ruta = ?"
  const newData = Object.values(dataValues)
  try {
    await pool.query("start transaction")
    await pool.query(queryUpdateId,newData)
    await pool.query("commit")
    return true
  } catch (error) {
    console.log(error)
    await pool.query("rollback")
    return false
  }
}

export const getAllWorkers = async() => {
  try {
    const result = await pool.query("SELECT * FROM trabajador where Id_Trabajador != 0")
    return result
  } catch (error) {
    console.log(error)
  }
}

export const addWorker = async(data)=>{
  const {nombre,apellido,rut}=data
  const queryMaxIdWorker = "Select max(Id_Trabajador) as max from trabajador"
  const queryAddWorker = "INSERT INTO trabajador values (?)"
  try {
    await pool.query("start transaction")
    const idMaxIdWorker = await pool.query(queryMaxIdWorker);
    await pool.query(queryAddWorker,[[idMaxIdWorker[0].max + 1 ?? 1,nombre,apellido,rut]])
    await pool.query("commit")
    return true
  } catch (error) {
    await pool.query("rollback")
    console.log(error)
    const errorcillo = JSON.stringify({
      message: "Ingrese parámetros correctos",
      status: 400,
    });
    throw new Error(errorcillo);
  }
}