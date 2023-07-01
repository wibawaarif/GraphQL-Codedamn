let { UserList, posts } = require('../FakeData')


const resolvers = {
  Query: {
    users: (parent,args, contextValue, info) => {
      // why not just return UserList ? because we redefined the union type on type-defs.js like users: [User!]!
      if (UserList) return { users: UserList }


      // send to union resolver UserList
      return {
        message: "There was an error!"
      }
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
      const id = args.id
      const index = UserList.findIndex(x => Number(x.id) === Number(id))
      UserList.splice(index, 1)
      return null
    }
  },
  UserResult: {
    __resolveType(obj) {
      // sent by users Query
      if (obj.users) {
        return "SuccessFetchingUsers" // defined on type defs union
      }

      if (obj.message) {
        return "FailedFetchingUsers"
      }

      return null
    }
  }
}

module.exports = {
  resolvers
}

/*
# example query using union
query GetAllUsers {
    users {
  ...on SuccessFetchingUsers {
        users {
            id
            name
            firstName
            lastName
            age
        }
    }
    
    ...on FailedFetchingUsers {
        message
    }
    }
}
*/