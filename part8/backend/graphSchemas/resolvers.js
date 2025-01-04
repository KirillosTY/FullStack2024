const { subscribe } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const User = require('../models/userSchema')
const Author = require('../models/authorSchema')
const Book = require('../models/bookSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()


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

      pubsub.publish('BOOK_SAVED', {addedBook: savedBook})

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
        console.log(userToken,' usertoken');
        console.log('secret',process.env.JWT_SEC);
        codedToken = jwt.sign(userToken, process.env.JWT_SEC) 
        console.log('token', codedToken);
    
    return {value:codedToken}
    }
  },

  Subscription: {
    addedBook: {
      subscribe: () =>  pubsub.asyncIterableIterator('BOOK_SAVED')
    }
  }
}

const authCheck = (loggedUser) => {
  if(!loggedUser){
    throw new GraphQLError('Bad auth', {
      extensions: {
        code: 'BAD AUTHORIZATION'
      }
    })
  }
}

module.exports = resolvers