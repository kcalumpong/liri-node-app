var keys = require("./keys.js");

var axios = require("axios");

var movie = process.argv[2];

var queryURL = "http://www.omdbapi.com/?s=" + movie + "&apikey=" + keys.omdbkey;
console.log(queryURL);

axios.get(queryURL)
.then(
  function(response) {
     console.log(response.data.Search);
  })
  .catch(function(error) {
    if (error.response) {
    } else {
 console.log("Error", error.message);
    }
 
  });
