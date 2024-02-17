const Employee = require("../models/Employee");

const employee_resolvers = {
  Query: {
    testEmployee: () =>
      "COMP3133_Assignment1 - Ahmet Buyukbas - Employee model",

    getEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (error) {
        throw new Error("Failed to fetch employees");
      }
    },
    getEmployeeById: async (_, { id }) => {
      try {
        const emp = await Employee.findById(id);
        if (!emp) {
          throw new Error("Employee not found");
        }
        return emp;
      } catch (error) {
        throw new Error("Failed to fetch employee by ID");
      }
    },
  },

  Mutation: {
    createEmployee: async (_, { input }) => {
      try {
        const newEmployee = new Employee(input);
        await newEmployee.save();
        console.log("Employee created successfully");
        return newEmployee;
      } catch (error) {
        throw new Error("Failed to create employee");
      }
    },
    updateEmployee: async (_, { id, input }) => {
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
        throw new Error("Failed to update employee");
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
          throw new Error("Employee not found");
        }
        console.log("Employee deleted successfully");
        return employee;
      } catch (error) {
        throw new Error("Failed to delete employee");
      }
    },
  },
};

module.exports = employee_resolvers;
