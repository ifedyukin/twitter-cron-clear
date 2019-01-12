const { deleteTweet } = require('./twitter'); // eslint-disable-line
const { connectMongoDB, clearDB, getOutdatedTweets } = require('./mongoose');

const removeTweets = async tweets => {
  // eslint-disable-line
  // try {
  //   await tweets.forEach(deleteTweet);
  // } catch (err) {
  //   console.error(err);
  // }
  console.log(tweets);
  return Promise.resolve();
};

const outdated = async () => {
  await connectMongoDB();
  const [outdatedTweets, condition] = await getOutdatedTweets();
  await removeTweets(outdatedTweets);
  await clearDB(condition);
  console.log('Outdated tweets were removed');
  process.exit(0);
};

outdated();
