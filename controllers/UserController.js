const { registerValidationSchema , loginValidationSchema} = require("../validation/UserValidation");
const UserService = require("../services/UserService");
const UserModel = require("../models/UserModel");
const jwtsecret = process.env.JWTSECRET;
const jwt = require('jsonwebtoken')

class UserController {
	registerUser = async (req, res) => {
		const { error } = registerValidationSchema.validate(req.body);
		if (error) {
			const errorMsg = error.details[0].message;
			res.send({ msg: errorMsg });
		} else {
			try {

				const { email, username, password } = req.body;
				const userByUsername = await UserModel.findOne({ username });
				const userByEmail = await UserModel.findOne({ email });

				if (userByUsername)
					return res.send({ msg: `Username ${username} isn't available` });
				if (userByEmail) return res.send({ msg: `Email already in use` });

				const createdUser = await UserService.createUser(req.body);
				{createdUser &&
					jwt.sign({ username : username , userId : createdUser.userId}, jwtsecret , (err , token )=> {
						if(err)	throw err;
						res.send(createdUser ? {msg : "User created successfully" , token : token , success : true} : { msg : "Couldn't create user" , success : false});
					})	
				}

			} catch (error) {

				res.send("Couldn't create user");
				console.log(error);
			}
		}
	};
	loginUser = async (req, res) => {
		const {error } = loginValidationSchema.validate(req.body)
		if(error){
			console.log(error.details)
			res.send(error.details[0].message)
		}
		else{
			try{
				const { username } = req.body
				const userByUsername = await UserModel.findOne({ username : username})
				if(userByUsername){
					const loggedInUser = await UserService.loginUser(req.body)
					{loggedInUser ? res.send("user logged in") : res.send("Incorrect password")}				
				}
				else{
					return res.send({ msg : 'User not found'})
				}

			}catch(error){
				res.send(error)
				console.log(error)
			}
		}
	};
	updateUser = (req, res) => {};
	deleteUser = (req, res) => {};
	logoutUser = (req, res) => {};
	viewProfile = (req, res) => {};
	fetchFriends = (req, res) => {};
}
module.exports = new UserController();
