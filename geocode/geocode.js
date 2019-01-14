var request = require('request');
const api_key = process.env.MAP_KEY;      // fetch stored API key for google maps

var geocodeAddress = (uncodedAddress, callback) => {
	// encode the address
	let address = encodeURIComponent(uncodedAddress);

	//Called once data comes back from http endpoint (HTTP request)
	request({
	    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api_key}`,
	    json: true																	// return in JSON
	}, (error, response, body) => {
	    // If the program gets a zero-results response from the api
	    if (body.status === 'ZERO_RESULTS') {
	        // run this block if an error exists
	        callback('Unable to find the given address.');
	        // if the program gets a good response back from the api
	    } else if (body.status === 'OK') {
	    	callback(undefined, {
	    		address: body.results[0].formatted_address,
	    		latitude: body.results[0].geometry.location.lat,
	    		longitude: body.results[0].geometry.location.lng
	    	})
	    } else {
	        // in all other cases, pin the problem on the google servers
	        callback("Unable to connect to Google Servers.");
	    }
	    
	});
};

// export the 'geocodeAddress' function so that it can be used in other files
module.exports.geocodeAddress = geocodeAddress;