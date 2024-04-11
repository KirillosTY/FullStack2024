const logger = require('./logger')
const morgan = require('morgan')


morgan.token('json', (req) => JSON.stringify(req.body));

const morganFormat = morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
  tokens.json(req, res),
].join(' '));


const errorHandler= (error, request, resposnse,next) => {

    if(error.name === 'CastError'){
        return resposnse.status(400).send({error:'False mail id'})
    }

    next(error)


}

module.exports = {
    morganFormat,
    errorHandler
}