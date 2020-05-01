module.exports = function( req, res, inputquery, response, listVariables, callback) {
	
	var GetDialogflow = require("../getdialogflow");
	var CheckBRParams = require("./CheckBRParams");
	var BluePrismBR = require("./BluePrismBR");
	var userId = req.body.from.id
	
	var inputSpeech =  response.result.fulfillment.speech;
	var outputSpeech = "";
	
	var varBRName = response.result.parameters['businessrule'];
	var varYear = response.result.parameters['Year'];
	var varPeriod = response.result.parameters['Period'];
	var varScenario = response.result.parameters['Scenario'];
	console.log( varYear + " - " + varPeriod + " - " + varScenario)
	
	if( varYear == ""  || varPeriod == ""  || varScenario == ""){
		

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
		console.log("Test output speech : " + outputSpeech);
		if( outputSpeech != "" && outputSpeech != null){
			console.log("In if ");
			if( i == 0 ){
				outputSpeech = "Sure, there are few parameters required to run the " + varBRName + " rule, " + outputSpeech
			}
			else{
				outputSpeech = "And " + outputSpeech
			}
			callback(outputSpeech)
			
				
		}
		else{
			console.log("In else ");
			inputquery =  "none";
			GetDialogflow( res, userId, inputquery, function( responseDF ){
				console.log("responseDF _____: " + responseDF);
				CheckBRParams( req, res, inputquery, responseDF, listVariables, function( responseParam ){
					console.log("Done : "+ responseParam);
					callback(responseParam)
				});
			});
		
		}
	}
	
	else{
		console.log("Fire Webservice. Deployed")
		BluePrismBR( varBRName, varYear, varPeriod, varScenario, function( responseParam ){
			callback(responseParam)
		});
		
		
	}
	
	
}