import { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Users } from './components/Users'

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql'
  })

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>List of Users</h1>
        <Users />
      </div>
    </ApolloProvider>
  )
}

export default App
