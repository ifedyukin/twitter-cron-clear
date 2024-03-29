const YESTERDAY = 24 * 60 * 60 * 1000;
const {
  TIMELINE_GET_TIMEOUT = 500,
  TIMELINE_COUNT = 200,
  LIFE = YESTERDAY * 28
} = process.env;

module.exports = {
  YESTERDAY,
  TIMELINE_COUNT,
  LIFE: Number(LIFE),
  TIMELINE_GET_TIMEOUT
};
