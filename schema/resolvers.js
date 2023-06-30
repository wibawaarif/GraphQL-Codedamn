const { UserList, posts } = require('../FakeData')


const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (_, args) => { // this is the case if you want just grab args argument, the entire argument is (parent, args, contextValue, info)
      return UserList.find((x) => x.id === args.id)
    },
    posts: () => {
      return posts;
    },
    post: (_, args) => {
      return posts.find((x) => x.title === args.title)
    }
  },
  User: {
    posts: () => {
      return posts.filter((x) => x.isTrending === true)
    }
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input
      const lastId = UserList.length
      user.id = lastId + 1
      UserList.push(user)
      return user
    }
  }
}

module.exports = {
  resolvers
}