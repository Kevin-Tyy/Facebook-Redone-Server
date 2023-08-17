const {
	registerValidationSchema,
	loginValidationSchema,
	userVerificationSchema,
	updateProfileSchema,
} = require("../validation/UserValidation");
const UserService = require("../services/UserService");
const UserModel = require("../models/UserModel");
const jwtsecret = process.env.JWTSECRET;
const jwt = require("jsonwebtoken");

class UserController {
	//post
	registerUser = async (req, res) => {
		const { error } = registerValidationSchema.validate(req.body);
		if (error) {
			const errorMsg = error.details[0].message;
			res.send({ msg: errorMsg, success: false });
		} else {
			try {
				const { email, username, phoneNumber } = req.body;
				const userByUsername = await UserModel.findOne({ username });
				const userByEmail = await UserModel.findOne({ email });
				const userByPhoneNumber = await UserModel.findOne({ phoneNumber });
				if (userByUsername)	
					return res.send({
						msg: `Username ${username} isn't available`,
						success: false,
					});
				if (userByEmail)
					return res.send({
						msg: `Email ${email} already in use`,
						success: false,
					});
				if (userByPhoneNumber)
					return res.send({
						msg: `Phone number ${phoneNumber} is already in use`,
						success: false,
					});
				const userInfo = await UserService.createUser(req.body);
				if (userInfo) {
					jwt.sign({ userInfo }, jwtsecret, (err, token) => {
						if (err) throw err;
						res.send({
							msg: "Your account has been created successfully",
							token: token,
							success: true,
						});
					});
				} else {
					res.send({
						msg: "Couldn't create account",
						success: false,
					});
				}
			} catch (error) {
				res.send({
					msg: "Something went wrong, Check your internet connection or try again later",
					success: false,
				});
				console.log(error);
			}
		}
	};
	//post
	loginUser = async (req, res) => {
		const { error } = loginValidationSchema.validate(req.body);
		if (error) {
			res.send({ msg: error.details[0].message, success: false });
		} else {
			try {
				const { username } = req.body;
				const userByUsername = await UserModel.findOne({ username: username });
				if (userByUsername) {
					const userInfo = await UserService.loginUser(req.body);
					if (userInfo) {
						jwt.sign({ userInfo }, jwtsecret, (err, token) => {
							if (err) throw err;
							res.send({
								msg: "You have logged in successfully",
								token: token,
								success: true,
							});
						});
					} else {
						res.send({ msg: "Incorrect password" });
					}
				} else {
					return res.send({
						msg: "User not found \n Please create an account",
					});
				}
			} catch (error) {
				res.send({ msg : "Something went wrong, Try again later" , success : false });
				console.log(error);
			}
		}
	};
	//post
	verifyUser = async (req, res) => {
		const { error } = userVerificationSchema.validate(req.body);
		if (error) {
			res.send({ msg: error.details[0].message, success: false });
		} else {
			try {
				const { userId, password } = req.body;
				const User = await UserService.verfiyUser(userId, password);
				if (!User) res.send({ msg: "Incorrect Password", success: false });
				if (User) res.send({ msg: "User verified", success: true });
			} catch (error) {
				res.send({ msg: "Something went wrong", success: false });
				console.log(error);
			}
		}
	};
	//put
	updateUser = async (req, res) => {
		const { error } = updateProfileSchema.validate(req.body);
		if (error) {
			res.send({ msg: error.details[0].message, success: false });
		} else {
			try {
				const userInfo = await UserService.updateUser(req.body);
				{
					userInfo
						? res.send({
								msg: "Your has been profile updated successfully",
								success: true,
								userInfo: userInfo,
						  })
						: res.send({ msg: "Couldn't update profile", success: false });
				}
			} catch (error) {
				res.send({ msg: "Something went wrong", success: false });
				console.error(error);
			}
		}
	};
	//delete
	deleteUser = async (req, res) => {
		try {
			const { userId } = req.params;

			const deletedUser = await UserService.deleteUser(userId);
			{
				deletedUser
					? res.send({ msg: "Account deleted successfully", success: true })
					: res.send({ msg: "Could not delete account", success: false });
			}
		} catch (error) {
			res.send({ msg: "Something went wrong", success: false });
		}
	};

	//get
	viewProfile = async (req, res) => {
		try {
			let { userId } = req.params;
			userId = userId.trim();
			const userData = await UserService.getUserById(userId);
			{
				userData
					? res.send(userData)
					: res.send({ msg: "Cannot view Profile", success: false });
			}
		} catch (error) {
			res.send({ msg: "Something went wrong", success: false });
		}
	};
	//get
	fetchFriends = async (req, res) => {
		try {
			const { userId } = req.params;

			const friendList = await UserService.getUserFriends(userId);
			{
				friendList
					? res.send({ data: friendList })
					: res.send({ msg: "Could not find friends" });
			}
		} catch (error) {
			res.send({ msg: "Something went wrong", success: false });
		}
	};
	fetchUsers = async (req, res) => {
		try {
			const users = await UserModel.find().limit(15);
			if (users.length > 0) {
				res.send(users);
			} else {
				res.send("No users found");
			}
		} catch (error) {
			res.send("Something went wrong, Refresh the page");
		}
	};
	addFriend = async (req, res) => {
		try {
			const { userId } = req.params;
			const { friendId } = req.body;
			const updatedUser = await UserService.addFriend(userId, friendId)
			{updatedUser ? 
				res.send({ msg : "Friend added" , success : true }):
				res.send({ msg : "Couldn't add friend" , success : false})
			}
		} catch (error) {
			res.send({ msg : "Something went wrong" , success : false })
		}
	};
	removeFriend = async (req , res) => {
		try {
			const {userId } = req.params;
			const { friendId } = req.body;
			const updatedUser = await UserService.removeFriend(userId, friendId)
			{updatedUser ? 
				res.send({ msg : "Friend removed" , success : true}) : 
				res.send({ msg : "Counldn't remove friend" , success : false})
			}
		} catch (error) {
			res.send({ msg : "Something went wrong" , success : false})
		}
	}
	
}
module.exports = new UserController();
