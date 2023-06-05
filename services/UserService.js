const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { Error } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

class UserService {
  
  async createUser(userData) {
    const { username, email, password , firstName , lastName , profileimage  , phoneNumber} = userData;
    const userId = uuidv4();
    const passwordhash = await bcrypt.hash(password , 10);
    try {
      const newUser = new UserModel({userId : userId, username: username , email:email , password: passwordhash , firstname : firstName , lastname : lastName , phoneNumber : phoneNumber , profileimage : profileimage});
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

  async verfiyUser (userId ,password) {
    try{
      const user = await UserModel.findOne({ userId : userId});
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
  async getUserFriends(userId) {
    try {
      const user = await UserModel.findOne({ userId : userId});
      const {friendList} = user;
      return friendList;

    } catch (error) {
      throw new Error('Failed to retrieve Users');
    }

  }

  async getUserById(userId) {
    try {
      const user = await UserModel.findOne({ userId: userId});
      console.log(user);
      return  user
    } catch (error) {
      throw new Error('Failed to retrieve User');
    }
  }

  async updateUser(UserData) {
    const {userId ,username, email, firstname, lastname , bio, location, education, work , profileimage } = UserData
    try {
      const updatedUser =  await UserModel.findOneAndUpdate(
        {userId : userId},
        { 
          username : username,
          profileimage : profileimage,
          email : email,
          firstname : firstname,
          lastname : lastname,
          bio : bio,
          location : location,
          education : education,
          work : work
        },
        {new : true});
      if(updatedUser) {
        return updatedUser;
      }; 
      
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to update User' , error);
    }
  }

  async deleteUser(userId) {
    try {
    
      const User = await UserModel.findOneAndDelete({ userId : userId });
      return User;
    } catch (error) {
      throw new Error('Failed to delete User');
    }
  }
}

module.exports =  new UserService();
