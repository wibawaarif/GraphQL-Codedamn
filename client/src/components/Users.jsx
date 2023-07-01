import { useQuery, gql } from '@apollo/client'

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
      users {
          id
          name
          firstName
          lastName
          age
          nationality
      }
  }
`

const QUERY_ALL_POSTS = gql`
  query GetAllUsers {
      posts {
          id
          title
          description
      }
  }
`

export const Users = () => {
  const { data: users, loading: loadingUsers } = useQuery(QUERY_ALL_USERS)
  const { data: posts, loading: loadingPosts } = useQuery(QUERY_ALL_POSTS)

  if (loadingUsers) {
    return <h1>Users is loading</h1>
  }

  if (loadingPosts) {
    return <h1>Posts is loading</h1>
  }

  console.log(posts);

  return (
    <div>
      {
        users && users.users.map(x => {
          return <div key={x.id}>
            <p>{ `${x.firstName} ${x.lastName}` }</p>
            <p>Age: {x.age}</p>
            <p>Nationality: {x.nationality}</p>
          </div>
        })
      }
      <h1>Posts</h1>
      {
        posts && posts.posts.map(x => {
          return <div key={x.id}>
            <p>{x.title}</p>
          </div>
      })
    }
    </div>
  )
}
