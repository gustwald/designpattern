const movieModule = {

  Movies: [
    {
      title : "Men In Black",
      year: "1994",
      rating: 9,
      genre:["Sci-Fi"],
      cover: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Men_in_Black_Poster.jpg/220px-Men_in_Black_Poster.jpg"
    },
    {
      title : "Frost",
      year: "2015",
      rating: 10,
      genre:["Drama"],
      cover: "https://s-media-cache-ak0.pinimg.com/564x/4e/cc/3f/4ecc3fca4348d86904c75420d2c8fb81.jpg"
    },
    {
      title : "Batman",
      year: "1993",
      rating: 2,
      genre:["Comedy"],
      cover: "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
      title : "Bamse",
      year: "1983",
      rating: 7,
      genre:["Thriller"],
      cover: "http://s1.discshop.se/img/front_large/66726/bamse_box_4_filmer.jpg"
    },
    
  ],
  //class constructor which handles the movie properties
  Movie: class movie {
      constructor(title, year, genre, rating, cover) {
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.rating = rating;
        this.cover = cover;
      }
  },
 //the form which handles all the input values and pushes them to the moviedatabase array
// we have a filter functions which checks for which genre is selected, and adds that to a array
//more basic "function" for getting the rating values checks all inputs with name ratingvalue, 
//also checks if they are checked and then grab that value
  submitForm: function (event) {
    const output = document.getElementById("output");

    const titlevalue = document.getElementById('titleValue').value;
    const yearvalue = document.getElementById('yearValue').value;
    const covervalue = document.getElementById('coverValue').value;
    const ratingvalue = document.querySelector('input[name="ratingvalue"]:checked').value;
    const genrevalue = [].filter.call(document.getElementsByName('genre'), (c) => c.checked).map(c => c.value);
    
    let movie = new movieModule.Movie(titlevalue, yearvalue, genrevalue, ratingvalue, covervalue);

    movieModule.Movies.push(movie);

    output.innerHTML = "Movie added!";
    setInterval(function(){ output.innerHTML = ""; }, 3000);

    event.preventDefault();
  },
    //gets all the movies, loop through them and prints them in html container
    getMovies: function () {
      const movieContainer = document.getElementById("movies");
    
      let html = '';
      for (let movie of movieModule.Movies) {
          html += `<h1>${movie.title}</h1>
                  <img src="${movie.cover}"></img><br>
                  Released: ${movie.year}<br>
                  Genre: ${movie.genre}<br>
                  Rating: ${movie.rating}`;
        }
      movieContainer.innerHTML = html;
  },
 //checks for lowest value of ratings in movies and returns that movie.
  getWorstRatedMovie: function() {
 
      var arr = [];
      for (let movie of movieModule.Movies) arr.push(parseInt(movie.rating));
                      
      const i = arr.indexOf(Math.min(...arr));
      const data = movieModule.Movies[i];

      return data;  
  },
   //checks for highest value of ratings in movies and returns that movie.
   getBestRatedMovie: function() {
 
      var arr = [];
      for (let movie of movieModule.Movies) arr.push(parseInt(movie.rating));
            
      const i = arr.indexOf(Math.max(...arr));
      const data = movieModule.Movies[i];

      return data;
   },
   //filters all the checkbox values and sorts and compares with actual genres in movieDatabase
  //if we get match we push them in new objects and then in data array which we can then access with render functions
   getMovieByGenre: function() {
      const movieContainer = document.getElementById("movies");
      const genre = [].filter.call(document.getElementsByName('sortByGenre'), (c) => c.checked).map(c => c.value);
      const data = [];
  
      movieModule.Movies.filter(movie =>{
            for(let i = 0; i < genre.length; i++){
                if(movie.genre.indexOf(genre[i]) > -1){
                    data.push(movie);
                }
            }
        })
        return data;
   },
   //checks input value and see if its matches with year in moviedatabase, then returns that movie object.
   getMovieByYear: function() {
 
    const data = [];
      const year = document.getElementById('movieByYearText').value;

      if(year == ""){
        alert("You have to write a year");
      }else{
      for (let movie of movieModule.Movies) {
          if(parseInt(year) == movie.year){
            data.push(movie);
          }
        }
        return data;
      }
    }
};

//render data 
//All these functions gets data from function and then prints it out as html, some loops are required on some data
const renderFunctions = {
  init() {
      document.getElementById("movieForm").addEventListener("submit", movieModule.submitForm);
      document.getElementById("showAllMovies").addEventListener("click", movieModule.getMovies);
      document.getElementById("getWorstMovie").addEventListener("click", renderFunctions.renderWorstMovie);
      document.getElementById("getTopMovie").addEventListener("click", renderFunctions.renderBestMovie);
      document.getElementById("movieByGenre").addEventListener("click", renderFunctions.renderMoviesByGenre);
      document.getElementById("movieByYear").addEventListener("click", renderFunctions.renderMoviesByYear);
    },

  renderWorstMovie : function() {

    const movieContainer = document.getElementById("movies");
    var output = "Worst rated movie is:"
    const movie = movieModule.getWorstRatedMovie();

    movieContainer.innerHTML = output + `<h1>${movie.title}</h1>`;

  },

  renderBestMovie : function(){

    const movieContainer = document.getElementById("movies");
    var output = "Best rated movie is:"
    const movie = movieModule.getBestRatedMovie();

  movieContainer.innerHTML = output + `<h1>${movie.title}</h1>`;
  },

  renderMoviesByYear : function(){

    const movieContainer = document.getElementById("movies");

    const data = movieModule.getMovieByYear();
    var output = "Displaying movies from year: " + data[0].year;
    
    for (let movie of data) {
       output += `<h1>${movie.title}</h1>`;
    }
    movieContainer.innerHTML = output;
  },

  renderMoviesByGenre : function(){

    const movieContainer = document.getElementById("movies");
    const data = movieModule.getMovieByGenre();

    var output = "Displaying movies from genre: ";
    
    for (let movie of data){
      if(movie.genre){
       output += `<h1> ${movie.genre}: ${movie.title}</h1>`;
      }else{
        output += "No movies in database with those genres";
      }
    }
    movieContainer.innerHTML = output;
  }

}

renderFunctions.init();
