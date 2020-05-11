const generateMessage = (username, text) => {
  return {
    text,
    username,
    createAt: new Date().getTime(),
  };
};
const generateLocationMessage = (username, url) => {
  return {
    url,
    username,
    createAt: new Date().getTime(),
  };
};
module.exports = {
  generateMessage,
  generateLocationMessage,
};
