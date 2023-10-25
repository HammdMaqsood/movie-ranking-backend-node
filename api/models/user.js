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
  about: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  profile: { type: String },
  postalCode: { type: Number },
  watchlist: [{ type: Number }]
})
userSchema.index({ email: 1 }, { unique: true })

const User = mongoose.model('User', userSchema)

module.exports = User
