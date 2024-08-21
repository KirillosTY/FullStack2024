const mongoose = require('mongoose')


const commentsSchema = mongoose.Schema({
    comments: String,
    blogId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    
})


commentsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Comments = mongoose.model('Comments', commentsSchema)

module.exports = Comments