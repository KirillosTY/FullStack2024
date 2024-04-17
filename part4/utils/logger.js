const info = (...parameters) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...params)
    }
}

const error = (...parameters) =>  {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...params)
    }
}

module.exports = {
    info,
    error
}