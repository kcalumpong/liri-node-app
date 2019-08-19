require("dotenv").config();

var moment = require("moment");
var omdbKey = require("./keys.js").omdbkey;
var keys = require("./keys.js").spotify;
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.id,
    //id: keys.spotify.id
    secret: keys.secret
});
var fs = require("fs");
var axios = require("axios");
var command = process.argv[2];
var value = process.argv[3];

switch (command) {

    case 'movie-this':
    if (value === undefined || value === null) {
        value = 'Mr. Nobody'
    }
    OMDB(value);
    break;

    case 'spotify-this':
    searchSpotify(value);
    break;

    case 'concert-this':

    if (value === undefined || value === null) {
        console.log('Sorry, please enter an artist/band name.');
        break;
    }
    bandsInTown(value);
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;

    default:
        console.log("error")
}

function OMDB(movie) {

    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + omdbKey;
    console.log(queryURL);

    axios.get(queryURL)
        .then(
            function (response) {
                console.log('---------');
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("Rating: " + response.data.Rated);
                console.log("Rotten Tomato Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log('-----------------');
            })
        .catch(function (error) {
            if (error.response) {
                console.log("Error", error.message);
            }
        });
}

function bandsInTown(artists) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp";
    
    axios.get(queryURL)
    
    .then(function(response) {
        var concerts = response.data;
        
        if (concerts.length == 0 || concerts === undefined) {
            console.log("-------------")
            console.log("Sorry this artist has not been found or not on tour")
            console.log("-------------")
            
        } else {
            console.log("-------------")
            console.log("Venue Name: " + concerts[0].venue.name)
            console.log("Venue Location: " + concerts[0].venue.city)
            console.log("Date: " + moment(concerts[0].datetime).format('MMMM Do YYYY'))
            console.log("-------------")
            }
        })

        .catch(function (error) {
            if (error.response) {
                console.log("Error", error.message);
            }
        });
}

function searchSpotify(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        var spotifyData = data.tracks.items[0];
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
        console.log("Artist's Name: " + spotifyData.album.artists[0].name)
        console.log("Song Name: " + spotifyData.name)
        console.log("Album Name: " + spotifyData.album.name)
        console.log("URL: " + spotifyData.album.external_urls.spotify)
        }
    });
}

function doWhatItSays() {
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        var result = data.split(",")
        console.log(result[1]);
        searchSpotify(result[1]);
    });
}