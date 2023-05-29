const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

class UserService {
  
  async createUser(userData) {
    const { username, email, password } = userData;
    const passwordhash = await bcrypt.hash(password , 10);
    try {
      const newUser = new UserModel({username: username , email:email , password: passwordhash});
      await newUser.save();
      return newUser;

    } catch (error) {
      throw new Error(`Failed to create user`);
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
      throw new Error(`Something went wrong: ${error.message}`); // Include the specific error message in the thrown error
    }
  }
  
  async getUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error('Failed to retrieve Users');
    }
  }

  async getUserById(UserId) {
    try {
      return await UserModel.findById(UserId);
    } catch (error) {
      throw new Error('Failed to retrieve User');
    }
  }

  async updateUser(UserId, UserData) {
    try {
      return await UserModel.findByIdAndUpdate(
        UserId,
        { $set: UserData },
        { new: true }
      );
    } catch (error) {
      throw new Error('Failed to update User');
    }
  }

  async deleteUser(UserId) {
    try {
      const User = await UserModel.findByIdAndDelete(UserId);
      if (!User) {
        throw new Error('User not found');
      }
      return User;
    } catch (error) {
      throw new Error('Failed to delete User');
    }
  }
}

module.exports =  new UserService();
