import express from "express";
import {
	differenceInCalendarYears,
	parseISO,
	startOfToday,
	differenceInYears,
} from "date-fns";
import utcToZonedTime from "date-fns-tz/utcToZonedTime/index.js";

const router = express.Router();

router.use(function timeLog(req, res, next) {
	next();
});

router.post("/", (req, res) => {
	const { Fecha_Nacimiento } = req.body;
	const parseBirthDate = parseISO(Fecha_Nacimiento);
	const hoy = startOfToday();
	const isAdult = differenceInYears(hoy, parseBirthDate) >= 18;
	res.send(isAdult);
});
export default router;
