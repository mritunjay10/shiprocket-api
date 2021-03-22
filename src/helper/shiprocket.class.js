const axios = require('axios');

const { Redis } = require('@redis');

class ShipRocket {

  constructor(){

    this.axiosAuthInstance =  axios.create({
      baseURL: process.env.SHIPROCKET_URL,
    });

    this.axiosInstance =  axios.create({
      baseURL: process.env.SHIPROCKET_URL,
      headers: {'Authorization Bearer': Redis.get(process.env.REDIS_SHIPROCKET_KEY)},
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

      const { vendor, name, email, phone, address,
        address_2, city, state, country, pin_code } = request;

      const result = await this.axiosInstance.post('settings/company/pickup', {
        pickup_location: vendor,
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

      const { success, address: data } = result

      if(!success) throw { message: 'Unable to register address' };

      return { status: success, data, message: 'Address registered successfully!' }
    }
    catch(e){

      return { status: false, data:null,  message: e.message }
    }
  }
}

module.exports = ShipRocket;