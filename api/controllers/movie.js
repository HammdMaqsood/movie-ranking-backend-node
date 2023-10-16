// const router = express.Router();
const Movie = require('../models/movie'); // Assuming you have a Movie model

exports.movie_save= (req, res, next) => {
// Create a new movie
  try {
    const { title, director, releaseYear } = req.body;
    // Create a new Movie document
    const newMovie = new Movie({
      title,
      director,
      releaseYear,
    });
    // Save the movie to the database
    const savedMovie =  newMovie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
