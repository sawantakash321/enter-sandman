"use strict";

var isContact = function isContact(parent) {
  return parent.contact_user;
};

module.exports = {
  isContact: isContact
};