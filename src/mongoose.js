const mongoose = require('mongoose');
const {MONGODB_URI} = process.env;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
    console.log('MongoDB was connected');
  } catch (err) {
    console.error(err);
  }
};

const Tweet = mongoose.model('tweets', new mongoose.Schema({
  date: {type: Date, required: true},
  id: {type: String, required: true},
  retweeted: {type: Boolean, required: true}
}));

const storeToDB = async (tweets) => {
  const mongoTweets = tweets
    .map(({created_at, id_str: id, retweeted}) => ({
      date: new Date(created_at),
      retweeted,
      id
    }));

  try {
    await Tweet.create(mongoTweets);
    console.log(`Save tweets`);
  } catch (err) {
    console.error(err);
  }

  return Promise.resolve();
};

module.exports = {
  storeToDB,
  connectMongoDB
};
