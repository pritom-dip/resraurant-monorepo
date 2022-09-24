const axios = require("axios");

getCategories = async () => {
  console.log("here also");
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  return data;
};

module.exports = {
  getCategories,
};
