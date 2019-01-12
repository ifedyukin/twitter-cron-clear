const mongoose = require('mongoose');
const {LIFE} = require('./constants');
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
  id_str: {type: String, required: true},
  retweeted: {type: Boolean, required: true}
}));

// TODO: remove
const Backup = mongoose.model('backup', new mongoose.Schema({
  date: {type: Date, required: true},
  id_str: {type: String, required: true}
}));

const storeToDB = async (tweets) => {
  const mongoTweets = tweets
    .map(({created_at, id_str, retweeted}) => ({
      date: new Date(created_at),
      retweeted,
      id_str
    }));

  try {
    await Tweet.create(mongoTweets);
    console.log(`Tweets were saved`);
  } catch (err) {
    console.error(err);
  }

  return Promise.resolve();
};

const getOutdatedTweets = async (date) => {
  const condition = {date: {'$lt': new Date() - new Date(LIFE)}};
  const outdatedTweets = await Tweet.find(condition);
  // TODO: remove
  await Backup.create(outdatedTweets.map(({id_str, date}) => ({id_str, date})));
  return [outdatedTweets, condition];
};

const clearDB = async (condition) => Tweet.deleteMany(condition);

module.exports = {
  clearDB,
  storeToDB,
  connectMongoDB,
  getOutdatedTweets
};
