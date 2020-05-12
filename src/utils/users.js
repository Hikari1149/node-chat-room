const users = [];

// addUser, removeUser, getUesr, getUsersinRoom

const addUser = ({ id, userName = "", room = "" }) => {
  // clean the data
  userName = userName.trim().toLowerCase();
  room = room.trim().toLocaleLowerCase();

  ///validate the data
  if (!userName || !room) {
    return {
      error: "User name and room are required!",
    };
  }
  //check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.userName === userName;
  });

  //Validate username
  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  //Store user
  const user = { id, userName, room };
  users.push(user);
  return {
    user,
  };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersinRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersinRoom,
};
