const { response } = require('@utils');


exports.requestPickUp = async (req, res)=>{

  try{

    res.send(true)
  }
  catch (e){

    response.error(e)
  }

  //response.success(res, { code: 200, success: true, message: 'Success', data, pagination: null});
};