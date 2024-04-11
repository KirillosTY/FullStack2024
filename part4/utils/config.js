require('dotenv').config()

MURL= process.env.MONGODB_URL
PORT= process.env.PORT

module.exports =  {
    MURL,
    PORT
}