
// Required modules for app.js
const fs = require('fs');
const keys = require('dotenv').config();                                                                          // Get environment variables (API Key)
const yargs = require('yargs');                                                                                   // load in yargs
const axios = require('axios');


// API KEYS
const map_key = process.env.MAP_KEY;                                                                              // Google Maps Geolocation API
const weather_key = process.env.WEATHER_KEY;                                                                      // Dark Sky API
// console.log(`MAP: ${map_key}`);
// console.log(`WEATHER: ${weather_key}`);

// Command line arguments with Yargs
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for.",
            string: true                                                                                          // always parse input as a string
        }
})
.help()
.alias('help', 'h')
.argv;

let address = encodeURIComponent(argv.address);                                                                   // encode the desired address
let geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${map_key}`            // generate the http api request
// console.log(`GEO URL: ${geoCodeURL}`);
                                                                                                                  // Call axios method to make geolocation request
                                                                                                                  // axios returns a promise, so we handle accordingly
axios.get(geoCodeURL).then((response) => {

    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address for Geo Location.');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let long = response.data.results[0].geometry.location.lng;
    let weatherURL = `https://api.darksky.net/forecast/${weather_key}/${lat},${long}`
    // console.log(`Weather URL: ${weatherURL}`);
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);

}).then((response) => {

  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)

}).catch((error) => {                                                                                               // If any error is thrown, catch will fire

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        console.log('Unable to connect to weather API servers.');
    } else {
    console.log(error.message);
    }
});
