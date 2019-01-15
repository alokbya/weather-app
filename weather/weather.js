
const request = require('request');
const weather_key = process.env.WEATHER_KEY; 
var getWeather = (lat, long, callback) => {

	request({
	    url: `https://api.darksky.net/forecast/${weather_key}/${lat},${long}`,
	    json: true,
	}, (error, response, body) => {
	    // print current temperature
	    if (!error && response.statusCode === 200) {
	        callback(undefined, {
	        	temperature: body.currently.temperature,
	        	apparentTemperature: body.currently.apparentTemperature
	    })} else {
	        callback('Unable to fetch weather from Dark Sky');
	    }
	});
};

// Export the function to other files
module.exports.getWeather = getWeather;