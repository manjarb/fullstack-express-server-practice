const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
   googleId: Number
});

mongoose.model('users', userSchema);