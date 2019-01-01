const request = require('request');
const fs = require('fs');
const keys = require('dotenv').config();  // Get environment variables (API Key)
const api_key = process.env.API_KEY;      // store API key for google maps

//Called once data comes back from http endpoint 
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=813%20nw%20oak%20ave%2097330&key=${api_key}`,
    json: true
}, (error, response, body) => {
    console.log(body);
});