const mongoose = require("mongoose");

const mongodb = async () => {
	const host = process.env.MONGOHOST;
	const port = process.env.MONGOPORT;
	const name = process.env.MONGODBNAME;

	mongoose
		.connect(`mongodb://${host}:${port}/${name}`)
		.then(() => console.log("Successfully connected to mongodb!"))
		.catch((err) => {
			console.error(`Error connecting to mongodb: ${err}`);
		});
};

module.exports = mongodb;
