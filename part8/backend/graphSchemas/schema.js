
const typeDefs = `

type Author {
    name: String!
    bookCount: Int
    born: Int
    id:ID!
    }

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

    

type Mutation {
        addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String!]
        ): Book

        editAuthor(
          name: String!
          bookCount: Int
          setBornTo: Int!
        ): Author

        createUser(
          username: String!
          favoriteGenre: String!
        ): User
        
        login(
          username: String!
          password: String!
        ): Token
}


type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre:String): [Book]
    allAuthors: [Author]
    me: User
    favouriteGenre: String!
  }
    
type Subscription {
  addedBook: Book!
}  
    
`



module.exports = typeDefs