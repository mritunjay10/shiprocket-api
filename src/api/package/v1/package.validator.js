const { response } = require('@utils');

exports.requestPickUp = (req, res, next)=>{

  try{

    next()
  }
  catch (e){
    response.error(e)
  }
};