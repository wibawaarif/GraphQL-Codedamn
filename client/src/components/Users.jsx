import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

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
  query GetAllPosts {
      posts {
          id
          title
          description
      }
  }
`

const QUERY_POST_BYNAME = gql`
  query Post($title: String!) {
    post(title: $title) {
      id
      title
      description
    }
  }
`

const MUTATION_CREATE_USER = gql`
  mutation User($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      firstName
      lastName
      age
      nationality
    }
  }
`

export const Users = () => {
  const [searchPost, setSearchPost] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    nationality: '',
  })

  const { data: users, loading: loadingUsers, refetch } = useQuery(QUERY_ALL_USERS)
  const { data: posts, loading: loadingPosts } = useQuery(QUERY_ALL_POSTS)
  const [fetchPost, { data: post, error: errorPost }] = useLazyQuery(QUERY_POST_BYNAME)
  const [postUser, { data: createUser, error: errorCreateUser }] = useMutation(MUTATION_CREATE_USER)

  if (loadingUsers) {
    return <h1>Users is loading</h1>
  }

  if (loadingPosts) {
    return <h1>Posts is loading</h1>
  }

  if (errorPost) {
    console.log(errorPost)
  }

  if (errorCreateUser) {
    console.log(errorCreateUser);
  }

  if (createUser) {
    refetch()
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%'}}>
        <h1>Create New User</h1>
        <input onChange={(e) => setForm((x) => {
          return {
            ...x,
            firstName: e.target.value
          }
        })} placeholder='Enter First Name' />
        <input onChange={(e) => setForm((x) => {
          return {
            ...x,
            lastName: e.target.value
          }
        })} placeholder='Enter Last Name' />
        <input onChange={(e) => setForm((x) => {
          return {
            ...x,
            age: Number(e.target.value)
          }
        })} type='number' placeholder='Enter Age' />
        <input onChange={(e) => setForm((x) => {
          return {
            ...x,
            nationality: e.target.value
          }
        })} placeholder='Enter Nationality' />
        <button onClick={() => postUser({
          variables: {
            createUserInput: {
              ...form
            }
          }
        })} style={{marginTop: '1rem', width: '100px'}}>Create</button>
      </div>
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
    <div>
      <input onChange={(e) => setSearchPost(e.target.value)} placeholder='Enter title to search' />
      <button onClick={() => {
        fetchPost({
          variables: {
            title: searchPost
          }
        })
      }}>Search</button>
      {
        post && <div>
          <p>Title: <span>{post.post.title}</span></p>
          <p>Description: <span>{post.post.description}</span></p>
        </div>
      }
      {
        errorPost && <div>There was an error when fetching the data!</div>
      }
    </div>
    </div>
  )
}
