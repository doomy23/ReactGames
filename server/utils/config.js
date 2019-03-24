const path = require('path');
const cosmiconfig = require('cosmiconfig');
const { get, defaultsDeep } = require('lodash');

const moduleName = "reactgames";
const explorer = cosmiconfig(moduleName, {
  searchPlaces: [
    `.${moduleName}rc`,
    `.${moduleName}rc.json`,
    `.${moduleName}rc.yaml`,
    `.${moduleName}rc.yml`,
    `.${moduleName}rc.js`,
    `${moduleName}.config.js`,
  ]
});
const search = explorer.searchSync();

// Defaults in package.json
const packageJson = require('../../package.json');
let config = get(packageJson, `configs.${moduleName}`, {});

// Assign customs configs over defaults
if(search)
  config  = defaultsDeep(search.config, config);

module.exports = config;
