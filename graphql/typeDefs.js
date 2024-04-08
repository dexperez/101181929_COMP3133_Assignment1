const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    username: String!
    email: String!
    password: String! # Note: It's recommended not to expose passwords in the schema.
  }

  type Employee {
    id: ID
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginUser {
    username: String!
    password: String!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: String!
  }

  type Query {
    testUser: String
    testEmployee: String
    getUsers: [User]
    getUserById(id: ID!): User
    getEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
  }

  type Mutation {
    signupUser(input: UserInput!): User
    loginUser(input: LoginUser!): User
    logoutUser(input: UserInput!): User
    deleteUser(id: ID!): User
    createEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = typeDefs;
