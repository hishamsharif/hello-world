var stagingConfig = require("./staging");
var productionConfig = require("./production");

/*
 * Create and export configuration variables
 *
 */

// Container for all the environments
// Add Staging (default) , Production environments,
var environments = { staging: stagingConfig, production: productionConfig };

// Determine which environment was passed as a command-line argument
var currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// Check that the current environment is one of the above, otherwise default to staging environment
var environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

// Export the module
module.exports = environmentToExport;
