let { UserList, posts } = require('../FakeData')


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
    },
    updateUser: (parent, args) => {
      const user = args.input

      const index = UserList.findIndex(x => Number(x.id) === Number(user.id))
      if (index === -1) {
        return "ID Not Found"
      }
      UserList[index] = {
        ...user
      }
      return UserList[index]
    },
    deleteUser: (parent, args) => {
      console.log('test');
      const id = args.id
      const index = UserList.findIndex(x => Number(x.id) === Number(id))
      UserList.splice(index, 1)
      return null
    }
  }
}

module.exports = {
  resolvers
}