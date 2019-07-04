//read and set envioronment varibles with dotenv package
require("dotenv").config();
//import the keys.js file and store in a variable
var keys = require("./keys.js");
//grab the axios package
var axios= require("axios");
//moment package
var moment = require("moment");
//get fs package
var fs = require("fs");
var chalk=require("chalk");
//get node spotify api package
var Spotify = require("node-spotify-api"); 

var spotify= new Spotify(keys.spotify);


var artistUrl = "https://rest.bandsintown.com/artists/";

//only user inputs the parameter, then change it to lower case
if(process.argv[2]!="" && process.argv[2]!=undefined){    
    var action=process.argv[2].toLowerCase();
}

//based on user's input action, call the responding function.
function processAction(){
  
  switch(action){

      case "concert-this":
          searchConcert();
          break;
      case "spotify-this-song": 
          spotifySong();
          break;
      case "movie-this":
          movie();
          break;  
      case "do-what-it-says":  
          doWhatItSays();
          break;
      default: 
          console.log(chalk.white.bgMagenta("Please input the correct action:")+chalk.blue("\nconcert-this artist/band name"+"\nspotify-this-song song name"+"\nmovie-this movie name"+"\ndo-what-it-says,please input actoin in random.txt")); 
          break;
  }
}

processAction();


function searchConcert(){
  
    var artistBandName = getParameter();
    var log="";

    artistUrl=artistUrl+artistBandName+"/events?app_id=codingbootcamp";
    console.log("artis",artistUrl);
    axios
        .get(artistUrl)
        .then(function(response){
         
            for(var j=0;j<response.data.length;j++){
                var dateConv=moment(response.data[j].datetime).format("MM/DD/YYYY");  
                console.log( chalk.blue.bgYellow.bold("\n\n Name of the Venue "+(j+1)+": "+response.data[j].venue.name));
                console.log(chalk.blue.bgYellow.bold("\n Venue Location: ")+response.data[j].venue.city+","+response.data[0].venue.region+","+response.data[j].venue.country);   
                console.log(chalk.blue.bgYellow.bold("\n Date of the Event: "),dateConv);
                log+=
                    "\n Name of the Venue "+j+": "+response.data[j].venue.name+
                    "\n Venue Location: "+response.data[j].venue.city+","+
                    response.data[0].venue.region+","+response.data[j].venue.country+
                    "\n Date of the Event: "+dateConv;

               
            }

            log="\nAction: "+ action+" "+artistBandName+log;
            writeLogFile(log);
        })

        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(chalk.red(error.response.data));
              console.log(chalk.red(error.response.status));
              console.log(chalk.red(error.response.headers));
            } else if (error.request) {
              // The request was made but no response was received              
                      console.log(chalk.red(error.request));
                    } else {
                      // Something happened in setting up the request that triggered an Error 
                          console.log(chalk.red("Error", error.message));
                    }
            console.log(chalk.red(error.config));
          });

}    


function spotifySong(){
  
    
    var log="";    
    var songName = getParameter();  
   
    log="\n\nAction: "+action+" "+songName;
    if(songName===""){
      songName="The Sign";     
    }    
    
      spotify
          .search({ type: "track", query: songName })
          .then(function(response) {
            for(var i=0;i<response.tracks.items.length;i++){
                
                  if( response.tracks.items[i].name === songName) { 
                      
                      console.log(chalk.blue.bgYellow.bold("\n\nArtist : "),response.tracks.items[i].artists[0].name);
                      console.log(chalk.blue.bgYellow.bold("\nName of the Song: "),response.tracks.items[i].name);
                      console.log(chalk.blue.bgYellow.bold("\nPreview Link: "),response.tracks.items[i].preview_url);
                      console.log(chalk.blue.bgYellow.bold("\nAlbum: "),response.tracks.items[i].album.name);
                      log+= "\nArtist default: "+response.tracks.items[i].artists[0].name+
                            "\nName of the Song: "+response.tracks.items[i].name+
                            "\nPreview Link: "+response.tracks.items[i].preview_url+
                            "\nAlbum: "+response.tracks.items[i].album.name;    
                      i=response.tracks.items.length;
                   }                 
                
            }
            writeLogFile(log); 
          })
          .catch(function(err) {
            console.log(err);
          });     
  
}

function movie(){

  var movie=getParameter();
  var log="";

  if (movie===""){
      movie = "Mr. Nobody";
  }

  var movieUrl="https://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey="  +process.env.OMDB_KEY;
  axios
  .get(movieUrl)
        .then(function(response){

          console.log(chalk.blue.bgYellow.bold("\n\nTitle: ")+response.data.Title+chalk.blue.bgYellow.bold("\n\nYear:  ")+response.data.Year);
          console.log(chalk.blue.bgYellow.bold("\nIMDB Ratings: "),response.data.imdbRating,chalk.blue.bgYellow.bold("\n\nRotten Tomatoes Ratings: "),response.data.Ratings[1].Value);
          console.log(chalk.blue.bgYellow.bold("\nCountry: "),response.data.Country,chalk.blue.bgYellow.bold("\n\nPlot:  "),response.data.Plot);
          console.log(chalk.blue.bgYellow.bold("\nActors: "),response.data.Actors);
          
          log= "\n\nAction: "+ action+" "+movie+
               "\nTitle: "+response.data.Title+"\nYear:  "+response.data.Year+
               "\nIMDB Ratings: "+response.data.imdbRating+"\nRotten Tomatoes Ratings: "+response.data.Ratings[1].Value+
               "\nCountry: "+response.data.Country+"\nPlot:  "+response.data.Plot+
               "\nActors: "+response.data.Actors;

          writeLogFile(log);
        })

        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(chalk.red(error.response.data));
              console.log(chalk.red(error.response.status));
              console.log(chalk.red(error.response.headers));
            } else if (error.request) {
              // The request was made but no response was received              
              console.log(chalk.red(error.request));
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log(chalk.red("Error", error.message));
            }
            console.log(chalk.red(error.config));
          });
}

function doWhatItSays(){

  var dataArr=[];
  var log="";

  fs.readFile("random.txt","utf-8",function(error,data){
    // If the code experiences any errors it will log the error to the console.
    if(error){
      return console.log(chalk.red("read file error: ",error));
    }
    
    dataArr=data.split(",");
    for(i=1,j=3;i<dataArr.length;i++,j++){
      process.argv[j]=dataArr[i];
    }
    
    action=dataArr[0];
    log="\nAction: "+action;
    writeLogFile(log);
    processAction();
  })
 
}

function getParameter(){
 // Get all elements in process.argv, starting from index 3 to the end
 // Join them into a string to get the space delimited address
  var resultParm=process.argv.slice(3).join(" ");    
  console.log("parm",resultParm);
  return resultParm;
}


function writeLogFile(logText){
  fs.appendFile("liri_log.txt", logText, function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(chalk.red("write file error : ",err));
    }
  
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      console.log(chalk.grey("Content Added to liri_log.txt!"));
    }
  
  });
}