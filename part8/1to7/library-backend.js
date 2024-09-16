const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError, GRAPHQL_MAX_INT } = require('graphql')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const  Book  = require('./models/bookSchema')
const  Author  = require('./models/authorSchema')

require('dotenv').config()
const mongoose = require('mongoose')

const MURL= process.env.NODE_ENV === 'test '? process.env.MONGODB_URL_TESTS : process.env.MONGODB_URL
const PORT= process.env.PORT


module.exports =  {
    MURL,
    PORT
}

mongoose.set('strictQuery',false)

console.log(`Connection url: ${MURL}`)
const mongoUrl = MURL
mongoose.connect(mongoUrl)


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

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

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]



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
        authorCount: async() => (await Author.find({})).length,
        allBooks: async (root,args) => {
            let modifyingBooks = await Book.find({}).populate('author', {name:1, born:1})
            console.log(modifyingBooks)
            if(args.author){
              console.log(modifyingBooks[0].author, args.author)

                modifyingBooks = modifyingBooks.filter(book => book.author.name === args.author)
                console.log(modifyingBooks)
            }
            if(args.genre){
                modifyingBooks = modifyingBooks.filter(book => book.genres.includes(args.genre))

            }
            return modifyingBooks
            
        },
        allAuthors: async () => {
          
            let authed = await Author.find({})
             authed.map(author => {
              author.bookCount =author.books.length
            })
          

            return authed
            
        }
    },
    Mutation: {
        addBook: async (root, args) => {

        
          let  authorFound = (await Author.findOne({name:args.author}))

          if(args.title.length <0 )
          if(!authorFound){
            authorFound = new Author({
            name: args.author,
            born: 1992,
            books:[]
          })
          try {
          authorFound = await  authorFound.save()
          } catch(error) {
            throw new GraphQLError('Saving author failed',{
              extensions: {
                code: 'MongooseSavingError',
                invalidArgs:authorFound,
                error
                }
              }
            )
          }
        }

        const newBook = new Book({ ...args, author:authorFound._id})
          
        try {
        const savedBook = await newBook.save()
         } catch(error) {
            throw new GraphQLError('Saving book failed',{
              extensions: {
                code: 'MongooseSavingError',
                invalidArgs: newBook,
                error
                }
              }
            )
        }
        

      try {
        authorFound.books = authorFound.books.concat(savedBook._id)
        savedAuth = await authorFound.save()

      } catch(error) {
        throw new GraphQLError('Saving book to author has failed',{
          extensions: {
            code: 'MongooseSavingError',
            invalidArgs:authorFound,
            error
            }
          }
        )
    }
        return  savedBook
    },
    editAuthor: async(root,args) => {
        const foundAuthor = await Author.findOne({name:args.name})
        console.log(foundAuthor)
        if(!foundAuthor){
            return null
            console.log('not found')
        }
        try {
        const editedAuthor = {
            ...foundAuthor.toObject(),
            born: args.setBornTo
        }
        console.log(editedAuthor)
        const updatedAuth = await  Author.findByIdAndUpdate(editedAuthor._id,editedAuthor, {new:true})
        return updatedAuth
      } catch (error) {
        throw new GraphQLError('Editing author has failed',{
          extensions:{
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