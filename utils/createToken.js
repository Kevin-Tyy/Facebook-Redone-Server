const Jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWTSECRET;

const createToken = async ({ firstname, lastname, userId, username }) => {
	return Jwt.sign({ firstname, lastname, userId, username }, jwtsecret);
};

module.exports = createToken;
