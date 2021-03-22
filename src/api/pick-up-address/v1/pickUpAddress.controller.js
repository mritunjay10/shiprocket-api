const { response } = require('@utils');

const { ShipRocket } = require('@helper');

exports.registerAddress = async (req, res)=>{

  try{
    const { vendor, email, phone, title, addressLineOne,
      addressLineTwo, city, pinCode, state, country  } = req.body;

    const { status, data, message } = await ShipRocket.createPickUpLocation({
      vendor,
      name: title,
      email,
      phone,
      address: addressLineOne,
      address_2: addressLineTwo,
      city,
      state,
      country,
      pin_code: pinCode,
    });

    if(!status) throw { message };

    response.success(res, { code: 201, message, data } )
  }
  catch (e){
    response.error(res, e)
  }
};