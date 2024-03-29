const { requestTimeline } = require('./twitter');
const { connectMongoDB, storeToDB } = require('./mongoose');
const { getLastId, getLastDate, isOld, isYesterday } = require('./utils');

const selectYesterday = ({ created_at: date }) => isYesterday(new Date(date));

const storeDailyTweets = async lastId => {
  const tweets = await requestTimeline(null, lastId);
  const createdAt = getLastDate(tweets);
  if (!createdAt) return;

  const lastTweetDate = new Date(createdAt);
  if (isOld(lastTweetDate)) {
    await storeToDB(tweets.filter(selectYesterday));
  } else if (isYesterday(lastTweetDate)) {
    await storeToDB(tweets);
    await storeDailyTweets(getLastId(tweets));
  }
};

const store = async () => {
  await connectMongoDB();
  await storeDailyTweets();
  process.exit(0);
};

store();
