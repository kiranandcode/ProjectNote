const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise =  Promise;

const postSchema = new Schema({
    person: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    message: { type: String, required: true },
    date: { type:Date, default: Date.now, required: true}
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;

