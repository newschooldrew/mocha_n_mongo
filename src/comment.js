const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title:String,
    Content:String,
    createAt: Date,
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports = mongoose.model('comment',commentSchema)