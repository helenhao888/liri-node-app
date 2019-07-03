//read and set envioronment varibles with dotenv package
require("dotenv").config();
//import the keys.js file and store in a variable
var keys = require("./keys.js");
// console.log("process env",process.env);
//grab the axios package
var axios= require("axios");
//moment package
var moment = require("moment");
//get fs package
var fs = require("fs");
//get node spotify api package
var Spotify = require("node-spotify-api"); 

var spotify= new Spotify(keys.spotify);
// spotify=keys.spotify;
// console.log("spotify",spotify);

var artistUrl = "https://rest.bandsintown.com/artists/";

//only user inputs the parameter, then change it to lower case
if(process.argv[2]!="" && process.argv[2]!=undefined){    
    var action=process.argv[2].toLowerCase();
}

// if(action==="do-what-it-says"){
//   console.log("before call");
//   action=doWhatItSays();
//   console.log("return action,", action);
// }

function processAction(){
  console.log("action",action);
  switch(action){
      case "concert-this":
          searchConcert();
          break;
      case "spotify-this-song":    
          console.log("spotify song");
          spotifySong();
          break;
      case "movie-this":
          movie();
          break;  
      case "do-what-it-says":   
          console.log("do what");
          doWhatItSays();
          break;
      default: 
          console.log("Please input the correct action:"+"\nconcert-this"+"\nspotify-this-song"+"\nmovie-this"+"\ndo-what-it-says");       
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
                console.log("\n\n Name of the Venue "+j+": "+response.data[i].venue.name);
                console.log("\n Venue Location: "+response.data[j].venue.city+","+response.data[0].venue.region+","+response.data[j].venue.country);   
                console.log("\n Date of the Event: ",dateConv);
                // log="\nAction: "+ action+" "+artistBandName+
                //     "\n Name of the Venue "+j+": "+response.data[j].venue.name+
                //     "\n Venue Location: "+response.data[j].venue.city+","+
                //     response.data[0].venue.region+","+response.data[j].venue.country+
                //     "\n Date of the Event: "+dateConv;

                // writeLogFile(log);
            }
        })

        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received              
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("error here");
              console.log("Error", error.message);
            }
            console.log(error.config);
          });


}    


function spotifySong(){
  // ??????????????????????????????????console
    var defaultSong=false;
    console.log("spotify",spotify);
    var songName = getParameter();  
    console.log("songname",songName);
    if(songName===""){
      songName="The Sign";
      artistName="Ace of Base";
      defaultSong=true;
    }
    console.log("song name after",songName);

      spotify
          .search({ type: "track", query: songName })
          .then(function(response) {
            for(var i=0;i<response.tracks.items.length;i++){
                if(defaultSong && response.tracks.items[i].artists[0].name === artistName){
                    console.log("\nArtist default: ",response.tracks.items[i].artists[0].name);
                    console.log("\nName of the Song: ",response.tracks.items[i].name);
                    console.log("\nPreview Link: ",response.tracks.items[i].preview_url);
                    console.log("\nAlbum: ",response.tracks.items[i].album.name);
                  
                }else{
                  console.log(response.tracks.items[i]);
                  console.log("\nArtist: ",response.tracks.items[i].artists[0].name);
                  console.log("\nName of the Song: ",response.tracks.items[i].name);
                  console.log("\nPreview Link: ",response.tracks.items[i].preview_url);
                  console.log("\nAlbum: ",response.tracks.items[i].album.name);
                }
            
            
            }
          })
          .catch(function(err) {
            console.log(err);
          });     
  //     var sportifyUrl="https://api.spotify.com/v1/q=name:"+songName+"&type=track";

  //     console.log("url",sportifyUrl);
  //     spotify
  //         .request(sportifyUrl)
  //         .then(function(data) {
  //           console.log(data); 
  //         })
  //         .catch(function(err) {
  //           console.error('Error occurred: ' + err); 
  // });
}

function movie(){

  var movie=getParameter();
  if (movie===""){
      movie = "Mr. Nobody";
  }

  var movieUrl="https://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy";
  axios
  .get(movieUrl)
        .then(function(response){

          console.log("movie response",response);
          console.log("\nTitle: "+response.data.Title+"\nYear:  "+response.data.Year);
          console.log("IMDB Ratings: ",response.data.imdbRating,"\nRotten Tomatoes Ratings: ",response.data.Ratings[1].Value);
          console.log("Country: ",response.data.Country,"\nPlot:  ",response.data.Plot);
          console.log("Actors: ",response.data.Actors);
          
        })

        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received              
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
}

function doWhatItSays(){

  var dataArr=[];

  fs.readFile("random.txt","utf-8",function(error,data){
    // If the code experiences any errors it will log the error to the console.
    if(error){
      return console.log("read file error: ",error);
    }
    console.log("data",data);
    dataArr=data.split(",");
    for(i=1,j=3;i<dataArr.length;i++,j++){
      process.argv[j]=dataArr[i];
    }
    console.log("process argv",process.argv);
    console.log("data Arr",dataArr[0]);
    action=dataArr[0];
    processAction();
  })
 
}

function getParameter(){

  var resultParm="";
   //get the fourth parmater
  for(var i=3;i<process.argv.length;i++){
     resultParm+=process.argv[i]+" ";
  }
  console.log("result parm",resultParm);
  return resultParm;
}


function writeLogFile(logText){
  fs.appendFile("liri_log.txt", logText, function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log("write file error : ",err);
    }
  
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      console.log("Content Added to liri_log.txt!");
    }
  
  });
}