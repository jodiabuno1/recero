import bcrypt from "bcrypt";

const comparePassword = async(myPlaintextPassword, hash) => {
	return bcrypt.compare(myPlaintextPassword, hash);
};

export default comparePassword;
