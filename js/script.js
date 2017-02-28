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
  const output = document.getElementById("output");

  const titlevalue = document.getElementById('titleValue').value;
  const yearvalue = document.getElementById('yearValue').value;
  const covervalue = document.getElementById('coverValue').value;
  const ratingvalue = document.querySelector('input[name="ratingvalue"]:checked').value;
  const genrevalue = [].filter.call(document.getElementsByName('genre'), (c) => c.checked).map(c => c.value);
  
  let movie = new Movie(titlevalue, yearvalue, genrevalue, ratingvalue, covervalue);

  movieDatabase.push(movie);

  output.innerHTML = "Movie added!";
  setInterval(function(){ output.innerHTML = ""; }, 3000);

  event.preventDefault();
}

//  console.log(JSON.stringify(genre));
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
     movieContainer.innerHTML = html;
}


//todo
//om två filmer har samma rating

const getWorstRatedMovie = () => {

    var arr = [];
    for (let movie of movieDatabase) arr.push(parseInt(movie.rating));
                    
    const i = arr.indexOf(Math.min(...arr));
    const data = movieDatabase[i].title;

    return data;  
}

const getBestRatedMovie = () => {

    var arr = [];
    for (let movie of movieDatabase) arr.push(parseInt(movie.rating));
          
    const i = arr.indexOf(Math.max(...arr));
    const data = movieDatabase[i].title;

    return data;
}
//tar bara senaste
const getMovieByGenre = () => {
    const movieContainer = document.getElementById("movies");
    const genre = [].filter.call(document.getElementsByName('sortByGenre'), (c) => c.checked).map(c => c.value);
    const data = [];
 
       movieDatabase.filter(movie =>{
             for(let i = 0; i < genre.length; i++){
                 if(movie.genre.indexOf(genre[i]) > -1){
                     data.push({ genre: genre, title: movie.title });
                 }
             }
          })
          return data;
}
//visar bara senaste
const getMovieByYear = () => {

    const data = [];
    const year = document.getElementById('movieByYearText').value;

    for (let movie of movieDatabase) {
        if(parseInt(year) == movie.year){
           data.push({ year: year, title: movie.title });
        }
         return data;
      }
     

}
const rateMovies = () => {
   const movieContainer = document.getElementById("movies");
   
    let html = 'Select the movie you want to rate';
    for (let movie of movieDatabase) {
        html += `<a href="#"><h1>${movie.title}</h1></a>`;
      }
     movieContainer.innerHTML = html;

}

//render data functions

//render worst movie
const renderFunctions = {
  renderWorstMovie : function() {

    const movieContainer = document.getElementById("movies");
    var output = "Worst rated movie is:"
    var movie = getWorstRatedMovie();


    movieContainer.innerHTML = output + `<h1>${movie}</h1>`;
  },

  renderBestMovie : function(){

    const movieContainer = document.getElementById("movies");
    var output = "Best rated movie is:"
    var movie = getBestRatedMovie();

  movieContainer.innerHTML = output + `<h1>${movie}</h1>`;
  },

  renderMoviesByYear : function(){

    const movieContainer = document.getElementById("movies");

    var data = getMovieByYear();

  for (let movie of data) {
        movieContainer.innerHTML = `<h1>Displaying movies from ${movie.year}: ${movie.title}</h1>`;
        }
  },

  renderMoviesByGenre : function(){

    const movieContainer = document.getElementById("movies");
    var data = getMovieByGenre();
    var output = "Displaying movies from genre";
    for (let movie of data){
      movieContainer.innerHTML = output + `<h1> ${movie.genre}: ${movie.title}</h1>`;
    }
  }

}



//buttons
document.getElementById("movieForm").addEventListener("submit", submitForm);
document.getElementById("showAllMovies").addEventListener("click", getMovies);
document.getElementById("getWorstMovie").addEventListener("click", renderFunctions.renderWorstMovie);
document.getElementById("getTopMovie").addEventListener("click", renderFunctions.renderBestMovie);
document.getElementById("movieByGenre").addEventListener("click", renderFunctions.renderMoviesByGenre);
document.getElementById("movieByYear").addEventListener("click", renderFunctions.renderMoviesByYear);
document.getElementById("rateMovies").addEventListener("click", rateMovies);
