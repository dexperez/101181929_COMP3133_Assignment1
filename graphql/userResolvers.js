const User = require("../models/User");
const { AuthenticationError } = require("apollo-server-express");

const user_resolvers = {
  Query: {
    testUser: () => "COMP3133_Assignment1 - Van Dexter Perez",

    getUsers: async (_, __, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to view users");
      }
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error("Failed to fetch users");
      }
    },

    getUserById: async (_, { id }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to view users");
      }
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.error("Failed to fetch user by ID:", error);
        throw new Error("Failed to fetch user by ID");
      }
    },
  },

  Mutation: {
    signupUser: async (_, { input }) => {
      try {
        const newUser = new User(input);
        await newUser.save();
        console.log("User created successfully");
        return newUser;
      } catch (error) {
        console.error("Failed to create user:", error);
        throw new Error("Failed to create user");
      }
    },

    deleteUser: async (_, { id }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to delete a user");
      }
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error("User not found");
        }
        console.log("User deleted successfully");
        return deletedUser;
      } catch (error) {
        console.error("Failed to delete user:", error);
        throw new Error("Failed to delete user");
      }
    },

    loginUser: async (_, { input }) => {
      try {
        const user = await User.findOne(input);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.error("Failed to login user:", error);
        throw new Error("Failed to login user");
      }
    },

    logoutUser: async (_, __, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to logout");
      }
      try {
        console.log("User logged out successfully");
        return { message: "User logged out successfully" };
      } catch (error) {
        console.error("Failed to logout user:", error);
        throw new Error("Failed to logout user");
      }
    },
  },
};

module.exports = user_resolvers;
