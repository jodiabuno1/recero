import bcrypt from "bcrypt";

const hashPassword = (myPlaintextPassword) =>
	bcrypt.hash(myPlaintextPassword, 10);

export default hashPassword
