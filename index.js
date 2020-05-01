var fs = require('fs'),
    path = require('path'),
	restify = require('restify');
	
const { BotFrameworkAdapter, InspectionMiddleware, MemoryStorage, InspectionState, UserState, ConversationState } = require('botbuilder');

const { MicrosoftAppCredentials } = require('botframework-connector');

// This bot's main dialog.
const { IntersectionBot } = require('./bot');

// Import required bot configuration.
const ENV_FILE = path.join(__dirname, '.env');


// Create HTTP server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 9000, () => {
    console.log(`\n${ server.name } listening to ${ server.url }`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Create the Storage provider and the various types of BotState.
const memoryStorage = new MemoryStorage();
const inspectionState = new InspectionState(memoryStorage);
const userState = new UserState(memoryStorage);
const conversationState = new ConversationState(memoryStorage);

// Create and add the InspectionMiddleware to the adapter.
adapter.use(new InspectionMiddleware(inspectionState, userState, conversationState, new MicrosoftAppCredentials(process.env.MicrosoftAppId, process.env.MicrosoftAppPassword)));