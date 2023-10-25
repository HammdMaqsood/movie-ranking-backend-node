const User = require('../models/user')
const bcrypt = require('bcrypt')
const fs = require('fs');
const { isStrongPassword } = require('validator')
const jwt = require('jsonwebtoken')

exports.register_user = async (req, res, next) => {
  const options = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
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
          } else if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' })
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

exports.login_user = (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed username' })
      }
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' })
        }
        if (passwordMatch) {
          const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
            expiresIn: '1d'
          })
          return res.status(200).json({ message: 'Authentication successful', accessToken })
        } else {
          return res.status(401).json({ error: 'Authentication failed password' })
        }
      })
    })
    .catch(() => {
      return res.status(500).json({ error: 'Internal server error' })
    })
}

exports.get_user_info = async (req, res, next) => {
  try {
    const userId = req.userData.userId
    const user = await User.findOne({ _id: userId })
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error4' })
  }
}

exports.add_watchlist = async (req, res, next) => {
  try {
    const movieId = req.body.movieId
    const userId = req.userData.userId
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    user.watchlist.push(movieId)
    try {
      user.save()
      res.status(200).json({ message: 'Movie added to watchlist'})
    } catch (error) {
      res.status(500).json({ error: 'user not saved' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.remove_watchlist = async (req, res, next) => {
  try {
    const movieId = req.body.movieId
    const userId = req.userData.userId
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const index = user.watchlist.indexOf(movieId)
    if (index === -1) {
      return res.status(404).json({ error: 'Movie not found in watchlist' })
    }
    user.watchlist.splice(index, 1)
    await user.save()
    res.status(200).json({ message: 'Movie removed from watchlist', user })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.get_watchlist = async (req, res, next) => {
  try {
    const userId = req.userData.userId
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const watchlist = user.watchlist
    res.status(200).json({ message: 'sucess', watchlist })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.update_user = async (req, res) => {
  console.log(req.query.user);
  try {
    const userId = req.userData.userId;
    let user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    let previousProfileImage;
    if (req.file) {
      previousProfileImage = user.profile;
      user.profile = req.file.filename;
    }
    try {
      await user.save();
      res.status(200).json({ message: 'Profile Image uploaded successfully' });
      if (previousProfileImage) {
        try {
          fs.unlinkSync(`./uploads/${previousProfileImage}`);
        } catch (error) {
          console.error('Error deleting previous profile image:', error);
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'Error Occurred While uploading Image' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


