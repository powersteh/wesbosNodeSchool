const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        uique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please Supply an emai'
    },
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    hearts:[
        { type: mongoose.Schema.ObjectId, ref: 'Store' }
    ]

});

userSchema.virtual('gravatar').get(function(){
    const hash = md5(this.email);
    return `http://gravatar/com/avatar/${hash}?=200`;
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

userSchema.plugin(mongodbErrorHandler);


module.exports = mongoose.model('User', userSchema);

