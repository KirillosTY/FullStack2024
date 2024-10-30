const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError, GRAPHQL_MAX_INT } = require('graphql')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const Book = require('./models/bookSchema')
const Author = require('./models/authorSchema')

require('dotenv').config()
const mongoose = require('mongoose')

const MURL = process.env.NODE_ENV === 'test ' ? process.env.MONGODB_URL_TESTS : process.env.MONGODB_URL
const PORT = process.env.PORT


module.exports = {
  MURL,
  PORT
}

mongoose.set('strictQuery', false)

console.log(`Connection url: ${MURL}`)
const mongoUrl = MURL
mongoose.connect(mongoUrl)



/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/



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
}


type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre:String): [Book]
    allAuthors: [Author]

  }
`

const resolvers = {


  Query: {
    bookCount: async () => (await Book.find({})).length,
    authorCount: async () => (await Author.find({})).length,
    allAuthors: async () => {

      let authed = await Author.find({})
      authed.map(author => {
        author.bookCount = author.books.length
      })


      return authed

    },
    allBooks: async (root, args) => {

      console.log('"käydään')
      let modifyingBooks = await Book.find({}).populate('author', { name: 1, born: 1 })
      console.log(modifyingBooks, "käydään")
      if (args.author) {
        console.log(modifyingBooks[0].author, args.author)

        modifyingBooks = modifyingBooks.filter(book => book.author.name === args.author)
        console.log(modifyingBooks)
      }
      if (args.genre) {
        modifyingBooks = modifyingBooks.filter(book => book.genres.includes(args.genre))

      }
      return modifyingBooks

    }
  },
  Mutation: {
    addBook: async (root, args) => {

      let authorFound = (await Author.findOne({ name: args.author }))

      if (!authorFound) {
        authorFound = new Author({
          name: args.author,
          born: 1992,
          books: []
        })
        try {
          authorFound = await authorFound.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'MongooseSavingError',
              invalidArgs: authorFound,
              error
            }
          }
          )
        }
      }


      let savedBook
      try {
        
        const newBook = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: authorFound._id
        })

        savedBook = await newBook.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'MongooseSavingError',
            invalidArgs: { ...args, author: authorFound._id },
            error
          }
        }
        )
      }


      try {
        authorFound.books = authorFound.books.concat(savedBook._id)

        savedAuth = await authorFound.save()

      } catch (error) {
        throw new GraphQLError('Saving book to author has failed', {
          extensions: {
            code: 'MongooseSavingError',
            invalidArgs: authorFound,
            error
          }
        }
        )
      }
      savedBook._doc.author = savedAuth
      console.log("Saved", savedBook)

      return savedBook
    },
    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name })
      if (!foundAuthor) {
        return null
        console.log('not found')
      }
      try {
        const editedAuthor = {
          ...foundAuthor.toObject(),
          born: args.setBornTo
        }
        console.log(editedAuthor)
        const updatedAuth = await Author.findByIdAndUpdate(editedAuthor._id, editedAuthor, { new: true })
        return updatedAuth
      } catch (error) {
        throw new GraphQLError('Editing author has failed', {
          extensions: {
            code: 'BAD USER BAD',
            invalidArgs: args,
            error
          }
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
}) 