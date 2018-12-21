require("dotenv").config();
var keys = require ("./keys");
var axios = require ("axios");
var moment = require ("moment");
var Spotify = require ("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs =require ("fs");
var command = process.argv[2]
var searchTerm = process.argv.slice(3, process.argv.length).join(" ");

function action(desiredAction,term) {
        switch (desiredAction) {
            case 'spotify-this-song':
                spotifyThis(term);
                break;
            case 'concert-this':
                bandsInTown(term);
                break;
            case 'movie-this':
                movieSearch(term);
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
            //   * Title of the movie.
            console.log("Title: ", response.data.Title);
            
//        * Year the movie came out.
            console.log("Year: ", response.data.Year);
            
//        * IMDB Rating of the movie.
            console.log("imdb Rating: ", response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: ", response.data.Ratings[1].Value);
    //   * Country where the movie was produced.
            console.log("Country: ", response.data.Country);
      // * Language of the movie.
            console.log("Language: ", response.data.Language);
//        * Plot of the movie.
            console.log("Plot: ", response.data.Plot);          
//        * Actors in the movie.  
            console.log("Actors: ", response.data.Actors);  
            
         
        })
};
function bandsInTown(searchQuery){
    if (searchQuery.length === 0){
        searchQuery = "Greta Van Fleet" 
    }
    axios.get("https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=codingbootcamp")
    .then(function(response){
        console.log("Artist is ", searchQuery);
        
        console.log("venue: ", response.data[0].venue.name);
        console.log("City: ", response.data[0].venue.city);
        console.log("Date: ", moment(response.data[0].datetime).format('MM/DD/YYYY'));
         
    })
     };
     
function random(){
    fs.readFile('random.txt', 'utf8', function(err, data) {
       if (err) throw err;
        var dataArray = data.split(',')
        var dataCommand = dataArray [0];
        var dataSearch = dataArray [1];
        if (dataArray.length === 2){
            action(dataCommand, dataSearch)
        }
        else if(dataArray.length ===1) {
            action(dataCommand)
        }
      });
      
};

action(command, searchTerm)


// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.
