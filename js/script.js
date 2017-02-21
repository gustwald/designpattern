class Movie {
  constructor(title, year, genre, rating, cover){

    this.title = title;
    this.year = year;
    this.genre = genre;
    this.rating = rating;
    this.cover = cover;
  }
}

var movieDatabase = [];

const submitForm = (event) => {

  const titlevalue = document.getElementById('titleValue').value;
  const yearvalue = document.getElementById('yearValue').value;
  const covervalue = document.getElementById('coverValue').value;
  const ratingvalue = document.querySelector('input[name="ratingvalue"]:checked').value;
  const genrevalue = [].filter.call(document.getElementsByName('genre'), (c) => c.checked).map(c => c.value);
  
  let movie = new Movie(titlevalue, yearvalue, genrevalue, ratingvalue, covervalue);

  movieDatabase.push(movie);

  event.preventDefault();

}
console.log(movieDatabase);


const getMovies = () => {
    const movieContainer = document.getElementById("movies");
    
    let html = '';
    for (let movie of movieDatabase) {
        html += `<h1>${movie.title}</h1>
                <img src="${movie.cover}"></img><br>
                Released: ${movie.year}<br>
                Genre: ${movie.genre}<br>
                Rating: ${movie.rating}`;
      }
     movieContainer.innerHTML += html;
}


//todo
//om två filmer har samma rating

const getWorstRatedMovie = () => {
  const movieContainer = document.getElementById("movies");

    var arr = [];
    for (let movie of movieDatabase) arr.push(parseInt(movie.rating));
                    
    const i = arr.indexOf(Math.min(...arr));
    const title = movieDatabase[i].title

    movieContainer.innerHTML += title;  
}

const getBestRatedMovie = () => {
  const movieContainer = document.getElementById("movies");

    var arr = [];
    for (let movie of movieDatabase) arr.push(parseInt(movie.rating));
          
    const i = arr.indexOf(Math.max(...arr));
    const title = movieDatabase[i].title

    movieContainer.innerHTML += title;
}

const getMovieByGenre = () => {
  
}

//buttons
document.getElementById("movieForm").addEventListener("submit", submitForm);
document.getElementById("showAllMovies").addEventListener("click", getMovies);
document.getElementById("getWorstMovie").addEventListener("click", getWorstRatedMovie);
document.getElementById("getTopMovie").addEventListener("click", getBestRatedMovie);
document.getElementById("movieByGenre").addEventListener("click", getMovieByGenre);
