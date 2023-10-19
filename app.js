const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const path = './uploads'
require('dotenv').config()

const userRoutes = require('./api/routes/user')
const tmdbController = require('./api/controllers/tmdb')

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@movies.9dthbxo.mongodb.net/?retryWrites=true&w=majority`
)

if (!fs.existsSync(path)) {
  fs.mkdir(path, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Directory created successfully.')
    }
  })
}

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
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
app.use('/tmdb', tmdbController.get_data)
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
