const Jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWTSECRET;

const createToken = async ({
	firstname,
	lastname,
	email,
	userId,
	username,
	profileimage,
}) => {
	return Jwt.sign(
		{ firstname, lastname, userId, username, profileimage, email },
		jwtsecret
	);
};

module.exports = createToken;
