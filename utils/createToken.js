const Jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWTSECRET;

const createToken = async ({ firstname, lastname, userId, username, profileimage }) => {
	return Jwt.sign({ firstname, lastname, userId, username, profileimage }, jwtsecret);
};

module.exports = createToken;
