const mongoose = require('mongoose')
const mediaSchema = new mongoose.Schema({
  mediaInfo: { type: Object },
})
const Media = mongoose.model('User', mediaSchema)
module.exports = Media
