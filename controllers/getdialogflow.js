module.exports = function( res, userId, inputquery, callback) {
	var speech = "";
	console.log("Input 2"+userId);
	var apiai = require('apiai');

    var app = apiai("2bd17f1c7f7244cba72a56beb4558f01");
	
    var request = app.textRequest( inputquery, {
        sessionId: userId   //'1486656220801'
    });
	
	request.on('response', function(response) {
		//console.log("Object - " + JSON.stringify(response.result) );
		var intentName = response.result.metadata.intentName
		console.log("Intent - " + intentName );
		speech =  response.result.fulfillment.speech;
		//console.log("speech in Dialoflow : " + speech)
		try{
			callback(response);
		}
		catch(e){
			console.log("Error : " + e)
			
		}
	});
	request.on('error', function(error) {
        console.log(error);
		speech = "Unable to process your request at the moment. Please try again later.";
		callback(speech);
		
    });

    request.end();

}