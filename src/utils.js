const {YESTERDAY} = require('./constants');

const getLast = tweets => tweets.slice(-1)[0] || {};

const getLastId = (tweets) => {
  const {id_str: last} = getLast(tweets);
  return last;
};

const getLastDate = (tweets) => {
  const {created_at: createdAt} = getLast(tweets);
  return createdAt;
};

const getNow = () => new Date();

const isOld = date => date < getNow() - YESTERDAY;

const isYesterday = date => !isOld(date) && date < getNow();

module.exports = {
  isOld,
  getLast,
  getLastId,
  getLastDate,
  isYesterday
};
