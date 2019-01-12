const {connectMongoDB, clearDB, getOutdatedTweets} = require('./mongoose');

const uniq = arr => Array.from(new Set(arr));

const removeTweets = async (tweets) => {
  Promise.resolve();
};

const outdated = async () => {
  await connectMongoDB();
  const [outdatedTweets, condition] = await getOutdatedTweets();
  const uniqIds = uniq(outdatedTweets.map(({id_str: id}) => id));
  await removeTweets(uniqIds);
  await clearDB(condition);
  console.log('Outdated tweets were removed');
  process.exit(0);
};

outdated();
