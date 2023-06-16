const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { Error } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const cloudUpload = require("../middleware/cloudUpload");

class UserService {
	async createUser(userData) {
		const {
			username,
			email,
			password,
			firstName,
			lastName,
			profileimage,
			phoneNumber,
		} = userData;
		const userId = uuidv4();
		const passwordhash = await bcrypt.hash(password, 10);
		const imagepUloadResponse = await cloudUpload(profileimage);
		try {
			const newUser = new UserModel({
				userId: userId,
				username: username,
				email: email,
				password: passwordhash,
				firstname: firstName,
				lastname: lastName,
				phoneNumber: phoneNumber,
				profileimage: profileimage ? imagepUloadResponse?.secure_url : 'image.png',
			});
			await newUser.save();
			return newUser;
		} catch (error) {
			throw new Error(`Failed to create user ${error.message}`);
		}
	}
	async loginUser(userData) {
		const { username, password } = userData;
		try {
			const user = await UserModel.findOne({ username });
			const isVerified = await bcrypt.compare(password, user.password);

			if (isVerified) {
				return user;
			}
		} catch (error) {
			throw new Error(`Something went wrong: ${error.message}`);
		}
	}

	async verfiyUser(userId, password) {
		try {
			const user = await UserModel.findOne({ userId: userId });
			if (user) {
				const isPasswordVerified = await bcrypt.compare(
					password,
					user.password
				);
				if (isPasswordVerified) {
					return user;
				}
			}
		} catch (error) {
			throw new Error(`Something went wrong: ${error.message}`);
		}
	}
	async getUserFriends(userId) {
		try {
			const user = await UserModel.findOne({ userId: userId });
			const { friendList } = user;
			return friendList;
		} catch (error) {
			throw new Error("Failed to retrieve Users");
		}
	}

	async getUserById(userId) {
		try {
			const user = await UserModel.findOne({ userId: userId }).populate(
				"friendList"
			);
			return user;
		} catch (error) {
			throw new Error("Failed to retrieve User");
		}
	}

	async updateUser(UserData) {
		const { userId, profileimage, location, work, education, bio } = UserData;
		const imagepUloadResponse = await cloudUpload(profileimage);

		try {
			const updatedUser = await UserModel.findOneAndUpdate(
				{ userId: userId },
				{
					$set: {
						profileimage: imagepUloadResponse?.secure_url,
						location: location,
						education: education,
						bio: bio,
						work: work,
					},
				},
				{ new: true }
			);
			if (updatedUser) {
				return updatedUser;
			}
		} catch (error) {
			console.log(error.message);
			throw new Error("Failed to update User", error);
		}
	}

	async deleteUser(userId) {
		try {
			const User = await UserModel.findOneAndDelete({ userId: userId });
			return User;
		} catch (error) {
			throw new Error("Failed to delete User");
		}
	}
	async addFriend(userId, friendId) {
		try {
			const user = await UserModel.findOne({ userId: userId });
			const friend = await UserModel.findOne({ userId: friendId });
			user.friendList.push(friend._id);
			friend.friendList.push(user._id);
			const updatedUser = await user.save();
			const updatedFriend = await friend.save();
			return updatedUser;
		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = new UserService();
