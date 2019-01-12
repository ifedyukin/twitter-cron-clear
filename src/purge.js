const {promisify} = require('util');
const {getLastId} = require('./utils');
const {TIMELINE_GET_TIMEOUT} = require('./constants');
const {twitter, deleteTweet, requestTimeline} = require('./twitter');

const purge = async (lastId) => {
  try {
    const tweets = await requestTimeline(lastId);
    if (!tweets.length) {
      console.log('That\'s all!')
      return;
    }

    setTimeout(() => purge(getLastId(tweets)), TIMELINE_GET_TIMEOUT);
    await Promise.all(tweets.map(deleteTweet));
  } catch (err) {
    console.error(err);
  }
};

purge();