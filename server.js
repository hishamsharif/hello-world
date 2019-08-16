/**
 * Primary file for the API's server
 */

var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

var router = require("./router");

// All the server logic for both the http and https servers
var unifiedServer = function (req, res) {
  //Get the URL and parse it
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the HTTP method
  var method = req.method.toLowerCase();

  // Get the headers as an object
  var headers = req.headers;

  // Get the payload, if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    // Construct the data object to send to the handler
    var data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    };

    // Route the request to the handler specified in the router
    router.handleRequest(data, function (statusCode, payload, isJSONResponse) {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof payload == "object" ? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Return the response
      isJSONResponse =
        typeof isJSONResponse == "boolean" ? isJSONResponse : false;
      if (isJSONResponse) {
        res.setHeader("Content-Type", "application/json");
      }
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log("Returning response: ", statusCode, payloadString);
    });
  });
};

module.exports = unifiedServer;
