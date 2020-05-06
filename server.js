
const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var https = require('https');

var fs = require('fs'),
    path = require('path');
restService.use(bodyParser.urlencoded({
    extended: true
}));
restService.use(bodyParser.json());

restService.get('/', onRequest);
restService.use(express.static(path.join(__dirname, '/public')));

function onRequest(request, response){
  response.sendFile(path.join(__dirname, '/public/index.html'));
}

var BluePrism = require('./controllers/BluePrism');
var GetDialogflow = require("./controllers/getdialogflow");
var BusinessRule = require("./controllers/Hyperion/BusinessRuleIndex");

restService.listen((process.env.PORT || 8888), function() {
  console.log("Server up and listening");
});

const { BotFrameworkAdapter, InspectionMiddleware, MemoryStorage, InspectionState, UserState, ConversationState } = require('botbuilder');

const { MessageFactory, CardFactory, ActionTypes } = require('botbuilder');


const adapter = new BotFrameworkAdapter({
    appId: "3734c841-4cc7-4401-b01a-c191f1410303" ,
    appPassword: "iL9=.-4EOsfgRgd9[08fgcAEby:x]GqF"
});
const { MicrosoftAppCredentials } = require('botframework-connector');

const memoryStorage = new MemoryStorage();
const inspectionState = new InspectionState(memoryStorage);
const userState = new UserState(memoryStorage);
const conversationState = new ConversationState(memoryStorage);

adapter.use(new InspectionMiddleware(inspectionState, userState, conversationState, new MicrosoftAppCredentials(process.env.MicrosoftAppId, process.env.MicrosoftAppPassword)));
//________________________


restService.post('/input', function(req, res) {
	var speech = "";
	//console.log("---------------------------------------------------------------")
	//console.log("Server Header : "+ JSON.stringify(req.headers))
	//console.log("---------------------------------------------------------------")
	console.log("Server Body : "+ JSON.stringify(req.body))
	console.log("---------------------------------------------------------------")
	
	var inputquery = req.body.text;
	var userName = req.body.from.name
	var userId = req.body.from.id
	
	if( inputquery == null){
		speech = "Server down."
		adapter.processActivity(req, res, async context => {
			await context.sendActivity(speech);
		});
		speech = "Initialising motion sequence....."
		adapter.processActivity(req, res, async context => {
			await context.sendActivity(speech);
		});
		speech = "Yes, I am back."
		adapter.processActivity(req, res, async context => {
			await context.sendActivity(speech);
		});
	}
	else{
		console.log("inputquery : "+ inputquery)
		console.log("Input 1"+userId);
		GetDialogflow( res, userId, inputquery, function( response ){
			console.log("Object - " + JSON.stringify(response.result) );
			var intentName = response.result.metadata.intentName
			console.log("Intent - " + intentName );
			
			//____________________________ Start ______________________________
			switch (true) {
				case ( intentName != null && intentName.indexOf( "WhatCanYouDo" ) == 0  ):{
					
					speech = "I got a couple of interesting things. here you go:";
					
					adapter.processActivity(req, res, async context => {
						await context.sendActivity(speech);
						speech = "I can run a business rule on Hyperion.";
						var card = CardFactory.heroCard(
							null,
							null,
							['Run Aggregation Plan rule ','Run Aggregation Forecast rule']
						);

						var message = MessageFactory.attachment(card);
						await context.sendActivity(speech);
						await context.sendActivity(message);
						
						 card = CardFactory.heroCard(
							"Let's do a survey",
							['https://www.rushordertees.com/static/879c9da1ee48db913261e685eb23bf59/ff8b7/aaf028b7e51cc456745a2c25b927c9d39e24329f_custom_pocket_t-shirts.jpg'],
							['Yellow?','Black?']
						);
						 message = MessageFactory.attachment(card);
						await context.sendActivity(message);
						
					 card = CardFactory.adaptiveCard({
					  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
					  "type": "AdaptiveCard",
					  "version": "1.0",
					  "body": [
						  {
							 "type": "TextBlock",
							 "text": "Press to invoke a function NukeChinaForCoronavirus()"
						  }
					  ],
					  "actions": [
						  {
							 "type": "Action.Submit",
							 "title": "The Button"
						  }
					  ]
					});

						 message = MessageFactory.attachment(card);
						await context.sendActivity(message);
						
						 message = MessageFactory.contentUrl('https://i.pinimg.com/originals/58/a8/77/58a877a134b754a731700c1480894b0e.jpg', 'image/jpeg', 'Hawaii Trip', 'A photo of my family vacation.');
						await context.sendActivity(message);

					});
					
				   break; 
				}
				
				case ( intentName != null && intentName.indexOf( "HitMe" ) == 0  ):{
					
					speech = "I can run a business rule for now. If you pay me well, very soon I will be  capable of doing much more.";
					
					adapter.processActivity(req, res, async context => {
						
						const card = CardFactory.heroCard(
							null,
							null,
							['Run a business rule','Run aggregate forecast']
						);

						const message = MessageFactory.attachment(card);
						await context.sendActivity(speech);
						await context.sendActivity(message);
					});
					
				   break; 
				}
				
				case ( intentName!= null && intentName.indexOf( "Run_BusinessRule" ) == 0  ):{
					
					BusinessRule( req, res, intentName, inputquery, response, function( responseBR ){
						console.log("responseBR : " + responseBR.toString());
						adapter.processActivity(req, res, async context => {
							await context.sendActivity(responseBR);
						});
					});
					
				   break; 
				}
				
				
				case ( intentName != null && intentName.indexOf( "Default Welcome Intent" ) == 0  ):{
					speech =  response.result.fulfillment.speech;
					if( speech == "Name?"){
						
						GetDialogflow( res, userId, userName, function( response1 ){
							speech =  response1.result.fulfillment.speech;
							adapter.processActivity(req, res, async context => {
								await context.sendActivity(speech);
							});
							
						});
					}
					else{
						speech =  response.result.fulfillment.speech;
						adapter.processActivity(req, res, async context => {
							await context.sendActivity(speech);
						});
						
					}
					
					break;
				}
				
				default : {
					speech =  response.result.fulfillment.speech;
					adapter.processActivity(req, res, async context => {
						await context.sendActivity(speech);
					});
					break;
				}
			}
			//____________________________ End ______________________________
		});
	}
	

});