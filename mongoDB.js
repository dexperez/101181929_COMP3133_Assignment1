const mongoose = require('mongoose');


const DB_USER = 'vandexterperez';
const DB_USER_PASSWORD = 'admin';
const DB_CLUSTER = 'cluster0.kfkpicy.mongodb.net';
const DB_NAME = 'comp3133_assignment1';
const mongodb_atlas_url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(mongodb_atlas_url, connectionParams)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
      throw error; // Re-throw the error to handle it outside this function if needed
    });
};