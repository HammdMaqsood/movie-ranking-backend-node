const axios = require('axios')
const User = require('../models/user')

exports.get_tmdb_data = async (req, res, next) => {
  const userId = req.userData.userId
  const user = await User.findOne({ _id: userId })
  const page = req.query.page || 1
  const language = req.query.language || 'en'
  const query = req.query.query || ''
  const appendToResponse = req.query.append_to_response || ''
  const path = req.path
  try {
    const apiKey = process.env.TMDB_API_TOKEN
    const config = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      params: {
        page,
        language,
        query,
        append_to_response: appendToResponse
      }
    }
    const response = await axios.get(`${process.env.TMDB_BASE_URL}${path}`, config)
    if (response?.data?.results && user) {
      const updatedResults = response.data.results.map((movie) => {
        if (user.watchlist.includes(movie.id)) {
          return { ...movie, watchlist: true };
        }
        return movie;
      });
        response.data.results = updatedResults;
      res.json(response.data);
    } else {
      res.json(response.data);
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while fetching TMDb data' })
  }
}
