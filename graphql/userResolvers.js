const User = require("../models/User");

const user_resolvers = {
  Query: {
    testUser: () => "COMP3133_Assignment1 - Van Dexter Perez",

    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },

    getUserById: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
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
        throw new Error("Failed to create user");
      }
    },

    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error("User not found");
        }
        console.log("User deleted successfully");
        return deletedUser;
      } catch (error) {
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
        throw new Error("Failed to login user");
      }
    },

    logoutUser: async (_, { input }) => {
      try {
        // For logout, you typically don't need to do anything on the server-side
        // Since it's more about client-side behavior, you can simply return a success message
        return { message: "User logged out successfully" };
      } catch (error) {
        throw new Error("Failed to logout user");
      }
    },
  },
};

module.exports = user_resolvers;
