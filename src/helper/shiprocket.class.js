const axios = require('axios');
const RandExp = require('randexp');

class ShipRocket {

  constructor(token){

    this.axiosAuthInstance =  axios.create({
      baseURL: process.env.SHIPROCKET_URL,
    });

    this.axiosInstance =  axios.create({
      baseURL: process.env.SHIPROCKET_URL,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async login(){

    try{

      const result = await this.axiosAuthInstance.post('auth/login', {
        email: process.env.SHIPROCKET_USER,
        password: process.env.SHIPROCKET_PASSWORD,
      });

      if(result.status !== 200) throw { message: 'Unable to get auth-token!' };

      return { status: true, message: 'Auth token fetched!', data: result.data };

    }
    catch (error){

      return { status: false, message: 'Error while operating', data: null };
    }
  }

  async createPickUpLocation(request){

    try{

      const { name, email, phone, address,
        address_2, city, state, country, pin_code } = request;

      const result = await this.axiosInstance.post('settings/company/addpickup', {
        pickup_location: new RandExp(/([0-9][a-z]\w{0,8})/).gen(),
        name,
        email,
        phone,
        address,
        address_2,
        city,
        state,
        country,
        pin_code,
      });

      const { success, address: addressData  } = result.data;

      if(!success) throw { message: 'Unable to register address' };

      return { status: success, data: addressData, message: 'Address registered successfully!' }
    }
    catch(error){

      const {response} = error;

      const {data: {message} } = response;

      console.log(JSON.stringify(response.data))

      return { status: false, data:null,  message: message|| 'Unable to register address' }
    }
  }
}

module.exports = ShipRocket;