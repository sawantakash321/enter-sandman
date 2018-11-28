const id = parent => parent.id;

const createdAt = (parent) => {
  const timestamp = JSON.stringify(parent.created_at);
  return timestamp.slice(1, -1);
};

const name = parent => parent.name;
const isContact = parent => parent.contact_user;

module.exports = {
  id,
  createdAt,
  name,
  isContact
};
