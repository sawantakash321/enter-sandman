"use strict";

var id = function id(parent) {
  return parent.id;
};

var createdAt = function createdAt(parent) {
  var timestamp = JSON.stringify(parent.created_at);
  return timestamp.slice(1, -1);
};

var name = function name(parent) {
  return parent.name;
};

var isContact = function isContact(parent) {
  return parent.contact_user;
};

module.exports = {
  id: id,
  createdAt: createdAt,
  name: name,
  isContact: isContact
};