import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_BOOKS, BOOK_SAVED } from "./queries/queries"
import { useQuery} from "@apollo/client"
import Login from "./components/Login";
import FavouriteGenre from "./components/FavouriteGenre"
import {useApolloClient, useSubscription } from "@apollo/client"


const App = ({client}) => {
  const [page, setPage] = useState("books");
  const [token, setToken] = useState(null)

  const loggedIn = localStorage.getItem('user-token')
  
  useEffect(()=> {

    if(loggedIn){
      setToken(loggedIn)
    }
  },[])

  useSubscription(BOOK_SAVED,{
    onData: ({ data }) => {
      console.log(data)
    }
  })


  if(!token){
    return (<div>
      <Login client={client} setToken={setToken}></Login>
    </div>)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("favourite books")}>favourite books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={()=> logout()}>Logout</button>
      </div>

      <Authors  show={page === "authors"} />

      <Books client={client} show={page === "books"} />
      
      <FavouriteGenre show={page === "favourite books"}/>

      <NewBook userLogged= {loggedIn} client={client} show={page === "add"} />
    </div>
  );
};

export default App;