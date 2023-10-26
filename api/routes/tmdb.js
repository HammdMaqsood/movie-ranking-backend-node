const express = require('express')
const router = express.Router()
const tmdbController = require('../controllers/tmdb')

router.all('*', tmdbController.get_tmdb_data)

module.exports = router
