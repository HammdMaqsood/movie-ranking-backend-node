const User = require('../models/user')
const bcrypt = require('bcrypt')
const { isStrongPassword } = require('validator')
const jwt = require('jsonwebtoken')

exports.register_user = async (req, res, next) => {
  const options = {
    minLength: 2
    // minLowercase: 1,
    // minUppercase: 1,
    // minNumbers: 1,
    // minSymbols: 1,
  }
  try {
    const { firstName, lastName, email, password } = req.body
    if (!isStrongPassword(password, options)) {
      return res.status(400).json({ error: 'Password is not strong enough' })
    }
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' })
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword
        })
        try {
          const savedUser = await newUser.save()
          res.status(201).json({ message: 'User saved successfully', user: savedUser })
        } catch (error) {
          if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message })
          } else {
            res.status(500).json({ error: 'Internal server error' })
          }
        }
      }
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

exports.login_user = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed username' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch) {
      const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: '7d'
      })
      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: '1h'
      })
      res.status(200).json({ message: 'Authentication successful', accessToken, refreshToken })
    } else {
      res.status(401).json({ error: 'Authentication failed password' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.get_user_info = async (req, res, next) => {
  try {
    console.log(req.userData)
    const userId = req.userData.userId
    const user = await User.findOne({ _id: userId })
    console.log(user)
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error4' })
  }
}
