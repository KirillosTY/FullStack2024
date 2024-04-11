const express = require('express')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const router = require('./controller/router')


mongoose.set('strictQuery',false)

logger.info(`Connection url: ${config.MURL}`)
const mongoUrl = config.MURL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use(middleware.morganFormat)

app.use('/api/blogs',router)


const PORT = config.PORT

module.exports = app