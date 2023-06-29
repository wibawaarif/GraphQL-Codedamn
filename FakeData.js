const UserList = [
  {
    id: 1,
    name: "John",
    firstName: "John",
    lastName: "Doe",
    age: 21,
    nationality: "Indonesia",
    condition: "AVAILABLE",
    friends: [
      {
        id: 3,
        name: "Michael",
        firstName: "Michael",
        lastName: "Saragih",
        age: 28,
        nationality: "Norwegian",
        condition: "AVAILABLE",
      },
      {
        id: 4,
        name: "Dani",
        firstName: "Dani",
        lastName: "Wicaksono",
        age: 30,
        nationality: "Afrikaans",
        condition: "AVAILABLE",
      },
    ]
  },
  {
    id: 2,
    name: "Arif",
    firstName: "Arif",
    lastName: "Wibawa",
    age: 22,
    nationality: "Australia",
    condition: "UNAVAILABLE",
  },
  {
    id: 3,
    name: "Michael",
    firstName: "Michael",
    lastName: "Saragih",
    age: 28,
    nationality: "Norwegian",
    condition: "AVAILABLE",
  },
  {
    id: 4,
    name: "Dani",
    firstName: "Dani",
    lastName: "Wicaksono",
    age: 30,
    nationality: "Afrikaans",
    condition: "AVAILABLE",
  },
]

const posts = [
  {
    id: 1,
    title: "Programming is fun!",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    isTrending: true
  }, 
  {
    id: 2,
    title: "Javascript is awesome",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    isTrending: false
  }
]

module.exports = {
  UserList,
  posts
}