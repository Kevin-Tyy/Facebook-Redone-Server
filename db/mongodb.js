const mongoose = require("mongoose");

const mongodb = async () => {
	const MongoUri = process.env.MONGOURI;
	mongoose
		.connect(`${MongoUri}`, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log("Successfully connected to mongodb!"))
		.catch((err) => {
			console.error(`Error connecting to mongodb: ${err}`);
		});
};
module.exports = mongodb;
