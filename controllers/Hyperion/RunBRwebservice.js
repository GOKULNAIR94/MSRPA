module.exports = function( req, res, inputquery, response, listVariables, callback) {
	
	var GetDialogflow = require("../getdialogflow");
	var CheckBRParams = require("./CheckBRParams");

	var inputSpeech =  response.result.fulfillment.speech;
	var outputSpeech = "";
	
	var varBRName = response.result.parameters['businessrule'];
	var varYear = response.result.parameters['Year'];
	var varPeriod = response.result.parameters['Period'];
	var varScenario = response.result.parameters['Scenario'];

	var i = 0;
	for( i = 0; i < listVariables.length; i++){
		console.log(" input Speech : " + inputSpeech)
		console.log("listVariables["+i+"] : " + listVariables[i])
		if( inputSpeech.indexOf( listVariables[i] ) >= 0 ){
			outputSpeech = response.result.fulfillment.speech;
			console.log(" YES Speech : " + outputSpeech)
			break;
		}
	}

	if( outputSpeech != ""){
		
		if( i == 0 ){
			outputSpeech = "Sure, there are few parameters required to run the " + varBRName + " rule, " + outputSpeech
		}
		else{
			outputSpeech = "And " + outputSpeech
		}
		res.json({
			"status": 200,
			"output": outputSpeech
		});
			
	}
	else{
		console.log( varYear + " - " + varPeriod + " - " + varScenario)
		if( varYear == ""  || varPeriod == ""  || varScenario == ""){
			inputquery =  "none";
			GetDialogflow( res, inputquery, function( responseDF ){
				CheckBRParams( req, res, inputquery, responseDF, listVariables, function( responseParam ){
					console.log("Done : "+ responseParam);
				});
			});
		}else{
			console.log("Fire Webservice. Deployed")
			res.json({
				"status": 200,
				"output": inputSpeech
			});
		}
	}
	
	
}