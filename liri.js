require("dotenv").config();
var keys = require ("./keys");
var axios = require ("axios");
var moment = require ("moment");
var Spotify = require ("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs =require ("fs");
var command = process.argv[2]
var searchTerm =process.argv[3]

function action(command, searchTerm) {
        switch (process.argv[2]) {
            case 'spotify-this-song':
                var resultFormatted = process.argv.slice(3, process.argv.length).join(" ");
                spotifyThis(resultFormatted);
                break;
            case 'concert-this':
                var artistFormatted = process.argv.slice(3, process.argv.length).join(" ");
                bandsInTown(artistFormatted);
                break;
            case 'movie-this':
                var movieFormatted = process.argv.slice(3, process.argv.length).join("+");
                movieSearch(movieFormatted);
                break;
            case 'do-what-it-says':
                random();
                break;
            default:
                console.log('invalid entry');
        }
}
function spotifyThis(searchQuery){
    if (searchQuery.length === 0){
searchQuery = "the sign + Ace of Base"
    }
    spotify.search({ type: 'track', query: searchQuery }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log("artist name: ", data.tracks.items[0].album.artists[0].name); 
  console.log("album name: ", data.tracks.items[0].album.name);
  console.log("song name: ", data.tracks.items[0].name);
  console.log("preview: ", data.tracks.items[0].preview_url);
  
  });};

function movieSearch(searchQuery){
    if (searchQuery.length === 0){
        searchQuery = "Mr Nobody"
    }
    axios.get("http://www.omdbapi.com/?t="+searchQuery+"&y=&plot=short&apikey=trilogy")
    .then(
        function(response) {
            console.log(response.data);
            //   * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.    ```
            
            // console.log("The movie's rating is: " + response.data.imdbRating);
        })
};
function bandsInTown(searchQuery){};
function random(){};

action(command, searchTerm)

    // (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=bd8be5cc-2668-48c4-b2d3-1f0af40a1387"`)

//   function(response) {
//     console.log("The movie's rating is: " + response.data.imdbRating);
//   }
// );


// ### What Each Command Should Do

// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//   * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.    ```
//       
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.
