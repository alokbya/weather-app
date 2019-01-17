const request = require('request');
const api_key = process.env.MAP_KEY;  

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
	request({
	    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api_key}`,
	    json: true																	// return in JSON
	}, (error, response, body) => {
	    // If the program gets a zero-results response from the api
	    if (body.status === 'ZERO_RESULTS') {
	        // run this block if an error exists
	        reject('Unable to find the given address.');
	        // if the program gets a good response back from the api
	    } else if (body.status === 'OK') {
	    	resolve({
	    		address: body.results[0].formatted_address,
	    		latitude: body.results[0].geometry.location.lat,
	    		longitude: body.results[0].geometry.location.lng
	    	})
	    } else {
	        // in all other cases, pin the problem on the google servers
	        reject("Unable to connect to Google Servers.");
	        console.log(body.status);
	    }
	});
	});
}

geocodeAddress('97330').then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
})