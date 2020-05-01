module.exports = function( varBusinessRule, varYear, varPeriod, varScenario, callback) {




callback("Ok, blue prism bot has been invoked to run the " + varBusinessRule + " business rule");
/*
var request = require("request");

var options = { method: 'POST',
  url: 'http://demoepmweb:8181/ws/BusinessRule',
  headers: 
   { 'postman-token': 'd272c041-de67-6a6d-b861-d31c49111dd8',
     'cache-control': 'no-cache',
     'content-type': 'text/xml',
     authorization: 'Basic ' },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:blueprism:webservice:businessrule" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\r\n   <soapenv:Body>\r\n      <urn:BusinessRule soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\r\n         <BusinessRule xsi:type="xsd:string">'+ varBusinessRule +'</BusinessRule>\r\n         <Year xsi:type="xsd:string">'+ varYear +'</Year>\r\n         <Period xsi:type="xsd:string">'+ varPeriod +'</Period>\r\n         <Scenario xsi:type="xsd:string">'+ varScenario +'</Scenario>\r\n      </urn:BusinessRule>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log("body : " + body);
  console.log("response : " + response.statusCode);
  
  if( response.statusCode == 200){
	  callback(varBusinessRule + " business rule has been run successfully");
	  console.log();
  }
  else{
	  callback("Unable to process your request at the moment. Please try again later.");
  }
});
*/





}