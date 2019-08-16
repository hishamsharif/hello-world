/**
 * Router to handle all API requests and respond back.
 */

// Define the handlers
var handlers = {};

// Hello handler
handlers.hello = function(data, callback) {
  // Callback a http status code, a payload object, flag to enable JSON response
  callback(406, { greeting: "Hello World" }, true);
};

// Ping handler
handlers.ping = function(data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

// Define a request router
var router = {
  hello: handlers.hello,
  ping: handlers.ping
};

var handleRequest = function(data, callback) {
  console.log("data", data);
  // Choose the handler this request should go to. If one is not found, use the notFound handler
  var choosenHandler =
    typeof router[data.trimmedPath] !== "undefined"
      ? router[data.trimmedPath]
      : handlers.notFound;

  choosenHandler(data, callback);
};

module.exports = { handleRequest };
