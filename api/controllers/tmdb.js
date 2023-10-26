const axios = require('axios')

exports.get_tmdb_data = async (req, res, next) => {
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
    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while fetching TMDb data' })
  }
}
