const request = require('request');
const fs = require('fs');
const keys = require('dotenv').config();  // Get environment variables (API Key)
const api_key = process.env.API_KEY;      // fetch stored API key for google maps
const yargs = require('yargs');           // load in yargs

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

console.log(argv.a);
let address = encodeURIComponent(argv.a);


//Called once data comes back from http endpoint (HTTP request)
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api_key}`,
    json: true
}, (error, response, body) => {
    if (body.status === 'ZERO_RESULTS') {
        // run this block if an error exists
        console.log('Unable to find the given address.');
    } else if (body.status === 'OK') {
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
    } else {
        console.log("Unable to connect to Google Servers.");
    }
    
});