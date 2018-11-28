const id = parent => parent.id;
const description = parent => parent.description;
const name = parent => parent.name;

const createdAt = (parent) => {
  /*
    Logic to print Timestamp with time zone in client friendly manner
    Input:  2018-08-15T05:08:50.095Z
    Output: 6/23/2018 7:38:50 AM

  let value = parent.created_at;
  if (value) {
    value = `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`;
  } else {
    value = '';
  }
  */
  const timestamp = JSON.stringify(parent.created_at);
  return timestamp.slice(1, -1);
};

module.exports = {
  id,
  description,
  name,
  createdAt
};
