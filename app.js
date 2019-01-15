
// Required modules for app.js
const fs = require('fs');
const keys = require('dotenv').config();            // Get environment variables (API Key)
const yargs = require('yargs');                     // load in yargs
const geocode = require('./geocode/geocode.js')     // can omit '.js' from file bc this file is also .js
const weather = require('./weather/weather')        // weather


// API Keys
const weather_key = process.env.WEATHER_KEY;

// Command line arguments with Yargs
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for.",
            string: true                                        // always parse input as a string
        }
})
.help()
.alias('help', 'h')
.argv;

// Write the user-inputted address to the console
// console.log(argv.address);

// Fetch geocode data with geocode function
// needs api key to work with google maps api
geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address)
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`)
            }
        });
    }
});

// Encode the address as a URI component (works for googles api)
