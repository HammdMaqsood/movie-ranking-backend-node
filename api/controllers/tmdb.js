const axios = require('axios')
const User = require('../models/user')

exports.get_tmdb_data = async (req, res, next) => {
  let user
  if( req.userData && req.userData.userId) {
    const userId = req.userData?.userId
     user = await User.findOne({ _id: userId })
  }
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
        const watchlistItem = user.watchlist.find((item) => item.id === movie.id);
        if (watchlistItem) {
          return { ...movie, watchlist: true, watchlistType: watchlistItem.type };
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
