module.exports = `
  type User {
    id: ID!
    title: String
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    users: [User]
    user(id: ID!): User
  }

  # this schema allows the following mutation:
  type Mutation {
  updateUser (
      userId: ID!
    ): User
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: Query
    mutation: Mutation
  }
`;
