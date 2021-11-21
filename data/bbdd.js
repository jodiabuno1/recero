import MySQL from "mysql";
import dotenv from "dotenv";
import { promisify } from "util";
import e from "express";
import {getDate} from "../utils/getDate.js"
dotenv.config(); // permite usar constantes de .env

let pool = MySQL.createPool({
	host: process.env.HOST_DATABASE,
	user: process.env.USER_DATABASE,
	port: 3306,
	password: process.env.PASSWORD_DATABASE,
	database: process.env.DATABASE,
});
pool.query = promisify(pool.query);
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
};
export const createUser = async (dataValues) => {
  const {Contrasena_Perfil, ...data} = dataValues
  const newData = Object.values(data)
  console.log("createUser",newData)
  const queryCreateUser = `INSERT INTO usuario values ?`
  const queryPerfil = "INSERT INTO perfil values (?)"
  const QueryIdMaxPerfil = "Select max(Id_Perfil) from perfil"
  try {
    await pool.query("start transaction")
    const data = await pool.query(queryCreateUser,[[newData]])
    const idMaxPerfil = await pool.query(QueryIdMaxPerfil);
    if(idMaxPerfil["max(Id_Perfil)"]){
      await pool.query(queryPerfil,[[idMaxPerfil["max(Id_Perfil)"] + 1, "User", newData[0],0,getDate(),Contrasena_Perfil]])
    }else {
      await pool.query(queryPerfil,[[1, "User", newData[0],0,`${getDate()}`,Contrasena_Perfil]])
    }
    await pool.query("commit")
    console.log("USER CREATED!")
    return data
  } catch (error) {
    await pool.query("rollback")
    console.log(error)
  }
}

export const getKeyPassPerfil = (rut) => {
  const query = "SELECT Rut_Num_Usuario, Contrasena_Perfil from perfil where Rut_Num_Usuario = ?"
  try {
    const data = pool.query(query,rut)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const verifyKeyPerfil = async (data) => {
  const query = "SELECT Rut_Num_Usuario, Contrasena_Perfil from perfil where Rut_Num_Usuario = ? and Contrasena_Perfil = ?"
  try {
    const result = await pool.query(query,[data.Rut_Num_Usuario,data.Contrasena_Perfil])
    return result.length
  } catch (error) {
    console.log(error)
  }
}

export const enablePerfil = async (rut) => {
  const query = "UPDATE perfil SET Is_Valid = 1 where Rut_Num_Usuario = ?"
  try {
    const result = pool.query(query,rut)
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getUserAndPassword = async(rut) => {
  const query = "SELECT Rut_Num_Usuario, Contrasena_Perfil from perfil where Rut_Num_Usuario = ?"
  try {
    const result = await pool.query(query,rut)
    return result[0]
  } catch (error) {
    console.log(error)
  }
}