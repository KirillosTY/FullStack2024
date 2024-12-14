const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError, GRAPHQL_MAX_INT } = require('graphql')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const Book = require('./models/bookSchema')
const Author = require('./models/authorSchema')
const User = require('./models/userSchema')

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

      let modifyingBooks = await Book.find({}).populate('author', { name: 1, born: 1 })
      if (args.author) {

        modifyingBooks = modifyingBooks.filter(book => book.author.name === args.author)
      }
      if (args.genre) {
        modifyingBooks = modifyingBooks.filter(book => book.genres.includes(args.genre))

      }
      return modifyingBooks

    },
    me: async(root,args, context) => context.loggedUser,
    favouriteGenre: async(root,args,context)=> {

      authCheck(context.loggedUser)
      foundUser = await User.findOne({username:context.loggedUser.username})
      if(foundUser === null){
        throw new GraphQLError('User not found',{
          extensions: {
            code:'NOT_FOUND',
            invalidArgs:context.loggedUser.username
          }
        })
      }
      return foundUser.favoriteGenre
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log('userlog',context);

      authCheck(context.loggedUser)
      console.log('userlog',context.loggedUser);
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
    editAuthor: async (root, args, context) => {
        console.log(context,'this here');


      const foundAuthor = await Author.findOne({ name: args.name })
      console.log(foundAuthor,'author found');
      if (!foundAuthor) {
        return null
        console.log('not found')
      }
      console.log('We got he','');
      try {
        const editedAuthor = {
          ...foundAuthor.toObject(),
          born: args.setBornTo
        }
        const updatedAuth = await Author.findByIdAndUpdate(editedAuthor._id, editedAuthor, { new: true })
        console.log('updatedAuth', updatedAuth)
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
    },
    createUser: async(root, args) => {
      const user = new User({username:args.username, 
        favoriteGenre:args.favoriteGenre})
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })

    },
    login: async (root,args) => {
      const user =  await User.findOne({username: args.username})
      if(!user || args.password !== 'muumi'){
        throw new GraphQLError('BAD INPUT', {
          extensions: {
            code: 'BAD_INPUT',
            invalidArgs: args.username, password
        
          }
        })
      }

      const userToken = 
        {username: user.username,
          id: user._id
        }
    
    return {value: jwt.sign(userToken, process.env.JWT_SEC)}
    }
  } 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const authCheck = (loggedUser) => {
  if(!loggedUser){
    throw new GraphQLError('Bad auth', {
      extensions: {
        code: 'BAD AUTHORIZATION'
      }
    })
  }
}

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({req,res}) => {
    const auth = req? req.headers.authorization: null
    if(auth && auth.startsWith('Bearer ')){
      const decodedTok = jwt.verify(auth.substring(7),process.env.JWT_SEC)
      const loggedUser = await User.findById(decodedTok.id)
      return {loggedUser}
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
}) 