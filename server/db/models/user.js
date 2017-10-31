const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.Promise =  Promise;


const userSchema = new Schema({
    firstName: { type: String, unique: false},
    lastName: {type: String, unique: false},
    local: {
        username: {type: String, unique: false, required: false},
        password: { type: String, unique: false, required: false}
    },
    google: {
        googleId: { type: String, required: false }
    }
});


userSchema.methods = {
    checkPassword: function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.local.password);
    },
    hashPassword: function(plainTextPassword) {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
}


userSchema.pre('save', function(next) {
    if(!(this.local.password)){
        console.log("===========NO PASSWORD PROVIDED==========");
        next();
    } else {
        this.local.password = this.hashPassword(this.local.password);
        next();
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;