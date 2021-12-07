import express from "express";
import dotenv from "dotenv";
import { engine } from "express-handlebars"; // metodo generador plantillas
import registerRoute from "./routes/register.js";
import accountsRoute from "./routes/accounts.js"
import loginRoute from "./routes/login.js"
import usersRoutes from "./routes/users.js"
import ageRoutes from "./routes/age.js"
import adminRoute from "./routes/admin.js"
import routesTrucks from "./routes/routeTruck.js"
import removesRoute from "./routes/formRemoveWaste.js"
import workerRoute from "./routes/workers.js"

dotenv.config(); // permite usar constantes de .env
const puertoServidor = process.env.PORT_SERVER; // constante de puerto de .env

const app = express(); // almacena la inicialización del framework express
//Configuración motor de plantillas handlebars
app.engine(
	"handlebars",
	engine({
		layoutsDir: "./",
		defaultLayout: "./views/layout/main",
		partialsDir: "./views/components/",
	})
);
app.set("view engine", "handlebars");

// permite recibir archivos desde el navegador al servidor
app.use(express.urlencoded({ extended: false }));
//middleware que permite al servidor recibir json en métodos http
app.use(express.json());

//rutas para archivos estáticos
app.use("/bootstrap-css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/bootstrap-js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/axios", express.static("./node_modules/axios/dist"));
// se inicia el servidor
app.listen(puertoServidor, () =>
	console.log(
		`Aplicación corriendo en puerto http://localhost:${puertoServidor}`
	)
);

// ruta temporales
app.get("/", (req, res) => {
	res.render("Home", {
		routes: [
			{ link: "/", name: "Home" },
			{ link: "/about", name: "nosotros" },
		],
	});
});
app.get("/about",(req,res)=>{
	res.render("About",{
		routes: [
			{ link: "/", name: "Home" },
			{ link: "/about", name: "nosotros" },
		],
	})
})
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/accounts",accountsRoute);
app.use("/user", usersRoutes)
app.use("/age",ageRoutes)
app.use("/admin",adminRoute)
app.use("/routes",routesTrucks)
app.use("/removes",removesRoute)
app.use("/workers",workerRoute)
