const mongoose = require('mongoose')
const { isEmail } = require('validator')
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email format'
    }
  },
  password: { type: String, required: true },
  profile: { type: String },
  watchlist: [{ type: String }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
