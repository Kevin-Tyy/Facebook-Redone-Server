const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

const jwtAuth = (req, res, next) => {
	const header = req.headers["authorization"];

	if (!header || !header.startsWith("Bearer ")) {
		res.status(403).send({ msg: "Invalid authorization header" });
		return;
	}

	const token = header.split(" ")[1];
	if (!token) {
		res.status(403).send({ msg: "User not logged in, token not provided" });
		return;
	}

	try {
		const data = jwt.verify(token, jwtSecret);
		if (!data) {
			res.status(401).send({ msg: "Invalid token" });
		} else {
			req.data = data;
			next();
		}
	} catch (err) {
		if (err.name === "JsonWebTokenError") {
			return res
				.status(401)
				.send({
					msg: "Invalid authentication token. Please log in again.",
					success: false,
					loggedIn: false,
				});
		} else {
			return res
				.status(500)
				.send({
					msg: "An unexpected error occurred. Please try again later.",
					status: false,
				});
		}
	}
};

module.exports = jwtAuth;
