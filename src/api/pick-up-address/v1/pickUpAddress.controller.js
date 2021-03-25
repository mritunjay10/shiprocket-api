const { response } = require('@utils');
const { ShipRocket  } = require('@helper');

exports.registerAddress = async (req, res)=>{

  try{
    const { email, phone, title, addressLineOne,
      addressLineTwo, city, pinCode, state, country  } = req.body;

    const shipRocket = new ShipRocket(req.shipRocket);

    const body = {
      name: title,
      email,
      phone,
      address: addressLineOne,
      address_2: addressLineTwo,
      city,
      state,
      country,
      pin_code: pinCode,
    };

    const { status, data, message } = await shipRocket.createPickUpLocation(body);

    if(!status) throw { message };

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};