'use strict';
const loopback = require('loopback');
module.exports = function(server) {
  const ds = server.datasources.petstore;
  ds.once('connected', () => {
    // This will make a model with all of the swagger-defined endpoints
    // for the PetService.
    ds.createModel('PetService', {});
  });
};
