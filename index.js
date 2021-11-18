import express from "express"
import dotenv from "dotenv"
import {engine} from "express-handlebars"

dotenv.config() // permite usar constantes de .env
const puertoServidor = process.env.PORT_SERVER // constante de puerto de .env

const app = express() // almacena la inicialización del framework express
//Configuración motor de plantillas handlebars
app.engine("handlebars", engine({
  layoutsDir: "./",
  defaultLayout: "./views/layout/main",
  partialsDir: "./views/components/",
}))
app.set("view engine","handlebars")
//rutas para archivos estáticos
app.use("/bootstrap-css",express.static("./node_modules/bootstrap/dist/css"))
app.use("/bootstrap-js",express.static("./node_modules/bootstrap/dist/js"))
app.use("/css",express.static("./public/css"))
app.use("/img",express.static("./public/img"))
// se inicia el servidor
app.listen(puertoServidor,()=> console.log(`Aplicación corriendo en puerto http://localhost:${puertoServidor}`))

// ruta temporales
app.get("/",(req,res)=>{
  res.render("Home",{
    routes:[{link: "/", name: "Home"},{link: "/about", name: "nosotros"}]
  })
})
app.get("/login",(req,res)=>{
  res.render("Login")
})
app.get("/register",(req,res)=>{
  res.render("Register")
})