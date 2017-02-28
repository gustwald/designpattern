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

//the form which handles all the input values and pushes them to the moviedatabase array
// we have a filter functions which checks for which genre is selected, and adds that to a array
//more basic "function" for getting the rating values checks all inputs with name ratingvalue, 
//also checks if they are checked and then grab that value
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

console.log(movieDatabase);

//gets all the movies, loop through them and prints them in html container
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

//Checks for lowest rating value in the moviedatabase and returns the title of that movie
const getWorstRatedMovie = () => {

    var arr = [];
    for (let movie of movieDatabase) arr.push(parseInt(movie.rating));
                    
    const i = arr.indexOf(Math.min(...arr));
    const data = movieDatabase[i].title;

    return data;  
}
//checks for highest value in movies and returns the title of that movie.
const getBestRatedMovie = () => {

    var arr = [];
    for (let movie of movieDatabase) arr.push(parseInt(movie.rating));
          
    const i = arr.indexOf(Math.max(...arr));
    const data = movieDatabase[i].title;

    return data;
}
//filters all the checkbox values and sorts and compares with actual genres in movieDatabase
//if we get match we push them in new objects and then in data array which we can then access with render functions
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
//todo: visar bara senaste
//checks input value and see if its matches with year in moviedatabase, then returns that movie in object.
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
  //is this needed
// const rateMovies = () => {
//    const movieContainer = document.getElementById("movies");
   
//     let html = 'Select the movie you want to rate';
//     for (let movie of movieDatabase) {
//         html += `<a href="#"><h1>${movie.title}</h1></a>`;
//       }
//      movieContainer.innerHTML = html;

// }

//render data functions

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



//eventlisteners for buttons
document.getElementById("movieForm").addEventListener("submit", submitForm);
document.getElementById("showAllMovies").addEventListener("click", getMovies);
document.getElementById("getWorstMovie").addEventListener("click", renderFunctions.renderWorstMovie);
document.getElementById("getTopMovie").addEventListener("click", renderFunctions.renderBestMovie);
document.getElementById("movieByGenre").addEventListener("click", renderFunctions.renderMoviesByGenre);
document.getElementById("movieByYear").addEventListener("click", renderFunctions.renderMoviesByYear);
// document.getElementById("rateMovies").addEventListener("click", rateMovies);
