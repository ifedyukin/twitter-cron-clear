# twitter-cron-clear
[![Deploy to Heroku](https://img.shields.io/badge/Deploy_to-Heroku-9777ba.svg)](https://heroku.com/deploy?template=https://github.com/ifedyukin/twitter-cron-clear)    

## Commands
* `npm run purge` - delete all your tweets;
* `npm run store` - store your tweets for the last day to Mongo;
* `npm run outdated` - delete outdated tweets;
* `npm run cron` - store your tweets and delete outdated tweets.

## ENV parameters
* `TIMELINE_GET_TIMEOUT` - pause timeout for your timeline requests;
* `TIMELINE_COUNT` - tweets per request (max - 200);
* `LIFE` - how many times your tweet isn't outdated (ms);
* `MONGODB_URI` - connetc URI for Mongo;
* `USER_NAME` - your twitter username;
* `CONSUMER_KEY` - Twitter API key;
* `CONSUMER_SECRET` - Twitter API secret key;
* `ACCESS_TOKEN` - Twitter access token;
* `ACCESS_SECRET` - Twitter access token secret;

## CRON usage
Just put `npm run cron` to daily CRON job.
