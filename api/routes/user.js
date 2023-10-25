const checkAuth = require('../middleware/checkAuth')
const checkImage = require('../middleware/checkImage')
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.get('/', checkAuth, UserController.get_user_info)
router.get('/watchlist', checkAuth, UserController.get_watchlist)
router.post('/register', UserController.register_user)
router.post('/login', UserController.login_user)
router.post('/add-watchlist', checkAuth, UserController.add_watchlist)
router.post('/remove-watchlist', checkAuth, UserController.remove_watchlist)
router.post('/upload',checkAuth, checkImage, UserController.update_user);
module.exports = router
