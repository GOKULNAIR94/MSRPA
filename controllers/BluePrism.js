module.exports = function( callback ) {

var request = require("request");

var options = { method: 'POST',
  url: 'http://in2386068w2:8181/ws/_02BPCertificationProcessQueue',
  headers: 
   { 'postman-token': 'e0d794aa-b5cc-1faf-f342-3e07f02e7a4a',
     'cache-control': 'no-cache',
     authorization: 'Basic',
     'content-type': 'text/xml' },
  body: '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:blueprism:webservice:_02bpcertificationprocessqueue">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:_02BPCertificationProcessQueue soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
  callback("Success");
});




}