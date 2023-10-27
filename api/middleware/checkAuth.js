const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader && req.baseUrl === '/tmdb')
    {
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({
        message: 'Token has expired.'
      })
    }
    req.userData = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    })
  }
}
