const Twitter = require('twitter');
const {TIMELINE_COUNT} = require('./constants');

const {
  USER_NAME,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_SECRET
} = process.env;

const twitter = Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN,
  access_token_secret: ACCESS_SECRET
});

const deleteTweet = (tweet) => {
  if (!tweet) return Promise.resolve();

  const {retweeted, id_str: id} = tweet;
  console.log(`Deleting ${id}`);

  return retweeted
    ? twitter.post('statuses/unretweet', {id})
    : twitter.post('statuses/destroy', {id});
};

const requestTimeline = (next = null, since = null) => {
  const params = {screen_name: USER_NAME, count: TIMELINE_COUNT};
  if (next) params.max_id = next;
  if (since) params.since_id = since;
  return twitter.get('statuses/user_timeline', params);
};

module.exports = {
  twitter,
  deleteTweet,
  requestTimeline
};
