const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const router = express.Router()
const tmdbController = require('../controllers/tmdb')

router.all('*', checkAuth,tmdbController.get_tmdb_data)

module.exports = router
