'use strict';

const app = require('../../server/server');
module.exports = function(Pet) {
  Pet.once('attached', () => {
    // Replace findById with your own logic
    Pet.findById = function(id, filter) {
      // In the case of both the result and/or the error, we only want
      // the "obj" property since it's the closest fit to our Model,
      // though the choice is yours to do as you will with them.
      return getPetService().getPetById({petId: id}).then(pet => {
        return pet.obj;
      }).catch(err => {
        return Promise.reject(err.obj);
      });
    };
  });
};

// Use a getter function to avoid early-binding of this value,
// since this file will be loaded before the swagger setup scripts!
function getPetService() {
  return app.dataSources.petstore.models.PetService;
}
