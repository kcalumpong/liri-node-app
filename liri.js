require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var  command = process.argv[2];
var value = process.argv[3]

switch(command) {
    
    case 'movie-this':
        OMDB(value);
    case 'spotify-this':
        spotify(value);
    case 'concert-this':
        bandsInTown(value);
    default:

}

function OMDB(movie) {
    
    var queryURL = "http://www.omdbapi.com/?s=" + movie + "&apikey=" + keys.omdbkey;
    console.log(queryURL);
    
    axios.get(queryURL)
    .then(
      function(response) {
          console.log('---------');
          console.log(response.data.Search[0].Title);
          console.log(response.data.Search[0].Year);
          console.log(response.data.Search[0].imdbID);
          console.log(response.data.Search[0].Poster);
          console.log('-----------------');
      })
      .catch(function(error) {
        if (error.response) {
        } else {
     console.log("Error", error.message);
        }
     
      });
        
}

function spotify(song){

}

function bandsInTown(artists) {

}