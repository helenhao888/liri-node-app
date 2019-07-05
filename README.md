# liri-node-app

### Overview

 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives user back data.

### App Link

### Developer
    Developed by Helen Hao (helenhao888)
### Technologies
    Node.js 
    javascript
    AXIOS package
    fs package
    moment package
    chalk package
    SPOTIFY, OMDB API

 ### Instructions
 liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API  for an artist and render the following information about each event to the terminal.
2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in the terminal/bash window

     * Artist(s) 

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.
   
3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to the terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
 4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
 5. If user only inputs `node liri.js `, it will give the command instructions. 


* In addition, all the actions will be loged to the file called `liri_log.txt`.

### screenshots of the app functioning

 1. `node liri concert-this `
![concert artist](images/concertImg.jpg)
