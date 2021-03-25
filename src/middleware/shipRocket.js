const { response } = require('@utils');
const { Redis } = require('@redis');

exports.token = async (req, res, next) =>{
  try{

    req.shipRocket = await Redis.get(process.env.REDIS_SHIPROCKET_KEY);

    next()
  }
  catch (e){
    response.error(res, e)
  }
};