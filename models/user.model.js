const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    token: { type: String }
});

module.exports = mongoose.model('User', UserSchema);