## Movie REST API
This Movie REST API allows users to manage movies, genres, users, reviews, and favorites. You can add genres, movies, register users, and perform CRUD operations such as getting, deleting, and updating movies, adding reviews, and marking favorite movies.

## Features
Add new movie genres (e.g., Drama, Sci-Fi, Action)
Add new movies with attributes such as name, year, and genre
Register new users with a name, username, password, and year of birth
Get a movie by ID
Delete a movie by ID
Get a list of movies with pagination (10 per page)
Search movies by keyword
Add reviews to movies with stars and review text
Add movies to a user's favorites
Retrieve a user's favorite movies
API Endpoints
Movie API main page:
http://localhost:3001/

# 1. Add a New Genre
Endpoint: POST /genres
Description: Adds a new movie genre (e.g., Comedy, Action, Drama).
Request Body:
json
Copy
Edit
{
  "name": "Comedy"
}


# 2. Add a New Movie
Endpoint: POST /movies
Description: Adds a new movie with properties like name, year, and genre.
Request Body:
json
Copy
Edit
{
  "name": "Interstellar",
  "year": 2014,
  "genreName": "Action"
}
genreId is the ID of the genre (e.g., 1 for Comedy).


# 3. Register a New User
Endpoint: POST /users/register
Description: Registers a new user with name, username, password, and year of birth.
Request Body:
json
Copy
Edit
{
  "name": "Samuel",
  "username": "Samppa",
  "password": "kaapikello",
  "year_of_birth": 1990
}


# 4. Get a Movie by ID
Endpoint: GET /movies/:id
Description: Retrieves a movie by its ID.
Example: /movies/14
Response:
json
Copy
Edit
{
  "id": 14,
  "name": "Interstellar",
  "year": 2014,
  "genre": "Action"
}


# 5. Delete a Movie by ID
Endpoint: DELETE /movies/:id
Description: Deletes a movie by its ID.
Example: /movies/14
Response: Movie deleted


# 6. Get All Movies (Paginated)
Endpoint: GET /movies
Description: Retrieves a list of movies with pagination (10 movies per page).
Example: /movies?page=1&limit=10
Response:
json
Copy
Edit
[
  { "id": 1, "name": "Movie 1", "year": 2020, "genre": "Drama" },
  { "id": 2, "name": "Movie 2", "year": 2019, "genre": "Comedy" },
  ...
]


# 7. Search Movies by Keyword
Endpoint: GET /movies/search?keyword=Comedy
Description: Retrieves movies that match the provided keyword.
Example: /movies/search?keyword=Comedy


# 8. Add a Review for a Movie
Endpoint: POST /movies/review
Description: Adds a review for a movie, including the user's username, rating (stars), and review text.
Request Body:
json
Copy
Edit
{
  "username": "samppa",
  "stars": 5,
  "reviewText": "Great movie!",
  "movieId": 1
}


# 9. Add a Movie to User's Favorites
Endpoint: POST /movies/:movieId/favorite
Description: Adds a movie to the user's favorite list.
Request Body:
json
Copy
Edit
{
  "username": "samppa"
}


# 10. Get a User's Favorite Movies
Endpoint: GET /movies/:username/favorites
Description: Retrieves all the favorite movies for a given user.
Example: /movies/samppa/favorites
Database Schema
The project uses PostgreSQL for data storage. The database contains the following tables:

genre: Stores movie genres (e.g., Action, Comedy).
movie: Stores movie details (name, year, genre).
user: Stores user information (username, password).
review: Stores reviews for movies (stars, review text).
favoritemovie: Stores favorite movies for users.
