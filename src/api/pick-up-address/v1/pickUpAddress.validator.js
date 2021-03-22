const { response } = require('@utils');

exports.registerAddress = async(req, res, next)=>{
  try{
    const { email, phone, title, addressLineOne,
      addressLineTwo, city, pinCode, state, country  } = req.body;

    if(!email) throw { code: 409, message: 'Invalid email' };

    if(!phone) throw { code: 409, message: 'Invalid phone' };

    const validPhone = global.phoneUtil.parseAndKeepRawInput(phone, process.env.COUNTRY_CODE);

    if(!validPhone) throw { code: 409, message: 'Invalid phone!' };

    if(!title) throw { code: 409, message: 'Invalid title' };

    if(!addressLineOne) throw { code: 409, message: 'Invalid address line one' };

    if(addressLineOne.length < 10) throw { code: 409, message:
        'Invalid address line  must be at least of 10 character long' };

    if(!addressLineTwo) throw { code: 409, message: 'Invalid address line two' };

    if(!city) throw { code: 409, message: 'Invalid city' };

    if(!pinCode) throw { code: 409, message: 'Invalid pin-code' };

    if( pinCode.length !== 6 ) throw { code: 409, message: 'Invalid pin-code' };

    if(!state) throw { code: 409, message: 'Invalid state' };

    if(!country) throw { code: 409, message: 'Invalid country' };

    next()
  }
  catch (e){
    response.error(res, e)
  }
};