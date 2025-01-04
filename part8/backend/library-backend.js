const { ApolloServer } = require('@apollo/server')
const { v1: uuid } = require('uuid')
const typeDefs = require('./graphSchemas/schema')
const resolvers = require('./graphSchemas/resolvers')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./models/userSchema')


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



const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart(){
          return {
            async drainServer(){
              await serverCleanup.dispose()
            }
          }
        }
      }
    ],
  })
  await server.start()
   
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
      
          const decodedToken =  jwt.verify(auth.substring(7), process.env.JWT_SEC)
          const loggedUser = await User.findById(decodedToken.id)
          return { loggedUser: loggedUser }
        }
      },
    }),
  )
  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}
start()