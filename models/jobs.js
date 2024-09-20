const { ServerDescriptionChangedEvent } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  PositionName: {
    type: String,
    required: true
  },
  Availability: {
    type: String,
    required: true
  },
  Field: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Requirement: {
    type: String,
    required: true
  },
  
  AddedBy: {
    type: String,
    required: true 
  }
 ,
 SignedUp: {  
  type: Array,
  required: false
 }
});

module.exports = mongoose.model('jobs', ShelterSchema);
