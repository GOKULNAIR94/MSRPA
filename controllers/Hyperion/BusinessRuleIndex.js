module.exports = function( req, res, intentName, inputquery, response, callback) {
	
	var fs = require('fs');
	
	var GetDialogflow = require("../getdialogflow");
	var CheckBRParams = require("./CheckBRParams");
	var BluePrismBR = require("./BluePrismBR");
	var userId = req.body.from.id

				var varBRName = "", varAppType = "", varAppName = "";
				varBRName = response.result.parameters['businessrule']
				varAppType = response.result.parameters['HyperionApplicationType']
				varAppName = response.result.parameters['HyperionApplicationName']
				console.log("varBRName : " + varBRName)
				console.log("varAppType : " + varAppType)
				console.log("varAppName : " + varAppName)
				
				if ( varBRName == "" || varAppType == "" || varAppName == "" ){
					speech = response.result.fulfillment.speech;
					callback(speech)
				}
				else{
					var listBRConfig, BRConfig;
				 
					listBRConfig = fs.readFileSync("./config/BRconfig.json", 'utf8');	
					listBRConfig = JSON.parse(listBRConfig);
					for (var i = 0; i < listBRConfig.length; i++) {
						if (listBRConfig[i].BusinessRule.includes(varBRName)) {
							BRConfig = listBRConfig[i];
							break;
						}
					}
					
					var countVariables = BRConfig.VariableCount;
					console.log("countVariables : " + countVariables)
					if (countVariables == 0){
						speech =  response.result.fulfillment.speech;
						BluePrismBR( varBRName, "none", "none", "none", function( responseParam ){
							callback(responseParam)
						});
						
					}
					else{
						var listVariables = BRConfig.Variables;
						if(intentName == "Run_BusinessRule"){
							inputquery = "select br variables"
							GetDialogflow( res, userId,inputquery, function( responseDF ){
								CheckBRParams( req, res, inputquery, responseDF, listVariables, function( responseParam ){
									console.log("Done : "+ responseParam);
									callback(responseParam)
								});
							});
						}
						else{
							console.log("inputquery : " + inputquery);
							CheckBRParams( req, res, inputquery, response, listVariables, function( responseParam ){
								console.log("Done : "+ responseParam);
								callback(responseParam)
							});
						}
						
					}
				}
				
				
				
				
				
				
}