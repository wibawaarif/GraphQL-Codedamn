const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    firstName: String!
    lastName: String
    age: Int!
    nationality: String!
    condition: UserAvailability!
    friends: [User]
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    description: String
    isTrending: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User!
    posts: [Post!]!
    post(title: String!): Post!
  }

  input CreateUserInput {
    name: String = "John"
    firstName: String!
    lastName: String
    age: Int!
    nationality: String!
    condition: UserAvailability = AVAILABLE
  }

  input UpdateUserInput {
    id: ID!
    name: String
    firstName: String
    lastName: String
    age: Int
    nationality: String
    condition: UserAvailability
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): User
  }

  enum UserAvailability {
    AVAILABLE
    UNAVAILABLE
  }
`

module.exports = {
  typeDefs
}