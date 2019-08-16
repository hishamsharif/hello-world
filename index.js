/*
 * The server bootsrap file
 *
 */

//Dependencies
var http = require("http");
var config = require("./config");
var unifiedServer = require("./server");

// Initiate the Http server
var httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

// Start the Http server
httpServer.listen(config.httpPort, function () {
  console.log("The Http server is listening on port " + config.httpPort);
});