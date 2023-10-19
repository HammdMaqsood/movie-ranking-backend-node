const checkAuth = require('../middleware/check-auth')
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.post('/register', UserController.register_user)
router.post('/login', UserController.login_user)
router.get('/', checkAuth, UserController.get_user_info)
module.exports = router
