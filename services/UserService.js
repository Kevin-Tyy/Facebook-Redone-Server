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
      throw new Error(`Something went wrong: ${error.message}`); 
    }
  }
  async verfiyUser (UserId ,password) {
    try{
      const user = await UserModel.findOne({ _id : UserId});
      if(user){
        const isPasswordVerified = await bcrypt.compare(password, user.password);
        if(isPasswordVerified){
          return user;
        }

      }
      
    }catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
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

  async updateUser(UserData) {
    const {userId ,username, email, firstname, lastname , bio, location, education, work , profileImage } = UserData
    try {
      const updatedUser =  await UserModel.findByIdAndUpdate(
        {_id : userId},
        { 
          username : username,
          profileImage : profileImage,
          email : email,
          firstname : firstname,
          lastname : lastname,
          bio : bio,
          location : location,
          education : education,
          work : work
        });
      if(updatedUser) {
        return updatedUser;
      }; 
      
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
