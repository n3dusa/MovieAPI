import express from 'express';
import bodyParser from 'body-parser'; 
import movieRoutes from './routes/movie.js';
import userRoutes from './routes/user.js';
import genreRoutes from './routes/genre.js';

const app = express(); 


app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Raw Body:", req.body);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Movie API!</h1>');
});

// Routes
app.use('/movies', movieRoutes); // Connect the movie-related routes
app.use('/users', userRoutes);  // Connect the user-related routes
app.use('/genres', genreRoutes); // Connect the genre-related routes

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});


