const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise =  Promise;

const projectSchema= new Schema({
    name: { type: String, required: true, unique: true },
    people: [{type: Schema.Types.ObjectId, ref: 'User'}],
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

