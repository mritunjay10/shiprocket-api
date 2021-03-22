const IORedis = require('ioredis');
const redis =  new IORedis({ keyPrefix: process.env.REDIS_BASE_PREFIX });

class Redis{

  get(key){
    return redis.get(key);
  }

  set(key, value){
    return redis.set(key, value);
  }

}

module.exports = Redis;