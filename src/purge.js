const { getLastId } = require('./utils');
const { TIMELINE_GET_TIMEOUT } = require('./constants');
const { deleteTweet, requestTimeline } = require('./twitter');

const purge = async lastId => {
  try {
    const tweets = await requestTimeline(lastId);
    if (!tweets.length) {
      console.log('All tweets were removed');
      return;
    }

    setTimeout(() => purge(getLastId(tweets)), TIMELINE_GET_TIMEOUT);
    await Promise.all(tweets.map(deleteTweet));
    console.log('Removing tweets');
  } catch (err) {
    console.error(err);
  }
};

purge();
