const GroupModel = require("../models/GroupModel");
const UserModel = require("../models/UserModel");

const SearchApi = async (req, res) => {
	let query = req.query.q;
	query.toLowerCase();
	try {
		const people = await UserModel.find();
		const filteredPeople = people.filter(
			(person) =>
				person.username.toLowerCase().includes(query) ||
				person.firstname.toLowerCase().includes(query) ||
				person.lastname.toLowerCase().includes(query)
		);

		res.json({ people: filteredPeople });
	} catch (error) {
		res.status(500).json({ msg: "Something went wrong, Try again" });
	}
};
module.exports = SearchApi;
