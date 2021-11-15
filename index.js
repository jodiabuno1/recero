import express from "express"
import dotenv from "dotenv"

dotenv.config() // permite usar constantes de .env
const app = express() // almacena la inicialización del framework express
const puertoServidor = process.env.PORT_SERVER // constante de puerto de .env

// se inicia el servidor
app.listen(puertoServidor,()=> console.log(`Aplicación corriendo en puerto http://localhost:${puertoServidor}`))

// ruta raíz
app.get("/",(req,res)=>{
  res.send("ok")
})