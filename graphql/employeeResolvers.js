const Employee = require("../models/Employee");
const { AuthenticationError, AuthorizationError } = require("apollo-server-express");

const employee_resolvers = {
  Query: {
    testEmployee: () =>
      "COMP3133_Assignment1 - Van Dexter Perez",

    getEmployees: async (_, __, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to view employees");
      }
      try {
        const employees = await Employee.find();
        return employees;
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        throw new Error("Failed to fetch employees");
      }
    },
    getEmployeeById: async (_, { id }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to view employees");
      }
      try {
        const emp = await Employee.findById(id);
        if (!emp) {
          throw new Error("Employee not found");
        }
        return emp;
      } catch (error) {
        console.error("Failed to fetch employee by ID:", error);
        throw new Error("Failed to fetch employee by ID");
      }
    },
  },

  Mutation: {
    createEmployee: async (_, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to create an employee");
      }
      // Add authorization check if currentUser.role !== 'admin' or any other role that has permission
      try {
        const newEmployee = new Employee(input);
        await newEmployee.save();
        console.log("Employee created successfully");
        return newEmployee;
      } catch (error) {
        console.error("Failed to create employee:", error);
        throw new Error("Failed to create employee");
      }
    },
    updateEmployee: async (_, { id, input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to update an employee");
      }
      // Add authorization check if currentUser.role !== 'admin' or any other role that has permission
      try {
        const employee = await Employee.findByIdAndUpdate(id, input, {
          new: true,
        });
        if (!employee) {
          throw new Error("Employee not found");
        }
        console.log("Employee updated successfully");
        return employee;
      } catch (error) {
        console.error("Failed to update employee:", error);
        throw new Error("Failed to update employee");
      }
    },
    deleteEmployee: async (_, { id }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to delete an employee");
      }
      try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
          throw new Error("Employee not found");
        }
        console.log("Employee deleted successfully");
        return employee;
      } catch (error) {
        console.error("Failed to delete employee:", error);
        throw new Error("Failed to delete employee");
      }
    },
  },
};

module.exports = employee_resolvers;
