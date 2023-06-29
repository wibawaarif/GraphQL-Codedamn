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

  enum UserAvailability {
    AVAILABLE
    UNAVAILABLE
  }
`

module.exports = {
  typeDefs
}