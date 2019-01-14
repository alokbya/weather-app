
const request = require('request');
const weather_key = process.env.WEATHER_KEY; 
var getWeather = (lat, long, callback) => {


	request({
	    url: `https://api.darksky.net/forecast/${weather_key}/${lat},${long}`,
	    json: true,
	}, (error, response, body) => {
	    // print current temperature
	    if (!error && response.statusCode === 200) {
	        console.log(body.currently.temperature);
	    } else {
	        console.log('Unable to fetch weather from Dark Sky');
	    }
	});
}



// Export the function to other files
module.exports.getWeather = getWeather;