const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
require('dotenv').config()

const path = require('path')
const userRoutes = require('./api/routes/user')
const tmdbRoutes = require('./api/routes/tmdb')

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@movies.9dthbxo.mongodb.net/?retryWrites=true&w=majority`
)

const storageEngine = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`)
  }
})

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 100000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
})

const checkFileType = function (file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|png|svg/
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = fileTypes.test(file.mimetype)
  if (mimeType && extName) {
    return cb(null, true)
  } else {
    cb('Error: You can Only Upload Images!!')
  }
}

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/user', userRoutes)
app.use('/tmdb', tmdbRoutes)
app.post('/single', upload.single('image'), (req, res) => {
  if (req.file) {
    res.send('Single file uploaded successfully')
  } else {
    res.status(400).send('Please upload a valid image')
  }
})
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
