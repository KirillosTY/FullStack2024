import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloClient,
  ApolloProvider,  InMemoryCache, HttpLink,
  createHttpLink
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

const authLink = setContext((_, {headers}) => {

  const token = localStorage.getItem('user-token')

  return {
      headers: {
        ...headers,
        authorization: token? `Bearer ${token}`: null,
      }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient
({
  cache: new InMemoryCache({
    addTypename:false
  }),
  link: authLink.concat(httpLink)

})


ReactDOM.createRoot(document.getElementById('root')).render(
<ApolloProvider client={client}>    
  <App client={client}/>
</ApolloProvider>)
  