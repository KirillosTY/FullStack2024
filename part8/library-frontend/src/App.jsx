import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_BOOKS } from "./queries/queries"
import { useQuery} from "@apollo/client"

const App = (props) => {
  const [page, setPage] = useState("authors");


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors  show={page === "authors"} />

      <Books  show={page === "books"} />

      <NewBook client={props.client} show={page === "add"} />
    </div>
  );
};

export default App;
