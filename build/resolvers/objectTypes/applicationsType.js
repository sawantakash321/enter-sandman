"use strict";

var id = function id(parent) {
  return parent.id;
};

var coverLetter = function coverLetter(parent) {
  return parent.cover_letter;
};

var createdAt = function createdAt(parent) {
  /*
    Logic to print Datestamp with time zone in client friendly manner
    Input:  2018-08-15T05:08:50.095Z
    Output: 6/23/2018 7:38:50 AM
   let value = parent.created_at;
  if (value) {
    value = `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`;
  } else {
    value = '';
  }
  */
  var timestamp = JSON.stringify(parent.created_at);
  return timestamp.slice(1, -1);
};

var listing = function listing(parent) {
  return {
    id: parent.listing_id,
    name: parent.name,
    description: parent.description
  };
};

module.exports = {
  listing: listing,
  createdAt: createdAt,
  id: id,
  coverLetter: coverLetter
};