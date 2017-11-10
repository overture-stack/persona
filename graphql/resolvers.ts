const { find, filter } = require('lodash');

const users = [
  { id: '1', name: 'Introduction to GraphQL', votes: 2 },
  { id: '2', name: 'Welcome to Meteor', votes: 3 },
  { id: '3', name: 'Advanced GraphQL', votes: 1 },
  { id: '4', name: 'Launchpad is Cool', votes: 7 },
];

module.exports = {
  Query: {
    user(_, { id }) {
      return find(users, { id });
    },
    users() {
      return users;
    },
  },
  Mutation: {
    updateUser(_, { userId }) {
      const user = find(users, { id: userId });
      if (!user) {
        throw new Error(`Couldn't find user with id ${userId}`);
      }
      user.votes = 100;

      return Object.assign(user, {});
    },
  },
};
