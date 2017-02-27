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

   for (let movie of movieDatabase) {
	    if(genre.some(function (mov) { return movie.genre.indexOf(mov) >= 0; })){
	    movieContainer.innerHTML += `<h1>Displaying movies from genre ${genre}: ${movie.title}</h1>`;
       
    }

 }

    

}
//visar bara senaste
const getMovieByYear = () => {

    const data = [];
    const year = document.getElementById('movieByYearText').value;
    for (let movie of movieDatabase) {
        if(parseInt(year) == movie.year){
           data.push({ year: year, title: movie.title });
        }
      }
      return data;

}
const rateMovies = () => {
    const movieContainer = document.getElementById("movies");
   
    for (let movie of movieDatabase) {
       
      }

}

//render data functions

//render worst movie
const renderWorstMovie = () => {

  const movieContainer = document.getElementById("movies");

  var movie = getWorstRatedMovie();

  movieContainer.innerHTML = `<h1>Worst rated movie: ${movie}</h1>`;
}
//render best rated movie
const renderBestMovie = () => {

  const movieContainer = document.getElementById("movies");

  var movie = getBestRatedMovie();

  movieContainer.innerHTML = `<h1>Best rated movie: ${movie}</h1>`;
}

//render movies by year
const renderMoviesByYear = () => {

  const movieContainer = document.getElementById("movies");

  var data = getMovieByYear();
console.log(data);

 for (let movie of data) {
       movieContainer.innerHTML += `<h1>Displaying movies from ${movie.year}: ${movie.title}</h1>`;
      }
      // for(i = 0; i < data.length; i++) {
      //  movieContainer.innerHTML = `<h1>Displaying best movies from year ${data[i].year}: ${data[i].title}</h1>`;
      // }
}



//buttons
document.getElementById("movieForm").addEventListener("submit", submitForm);
document.getElementById("showAllMovies").addEventListener("click", getMovies);
document.getElementById("getWorstMovie").addEventListener("click", renderWorstMovie);
document.getElementById("getTopMovie").addEventListener("click", renderBestMovie);
document.getElementById("movieByGenre").addEventListener("click", getMovieByGenre);
document.getElementById("movieByYear").addEventListener("click", renderMoviesByYear);
document.getElementById("rateMovies").addEventListener("click", rateMovies);
