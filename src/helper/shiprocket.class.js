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
        pickup_location: new RandExp(/^[A-Z0-9]{8}$/).gen(),
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

      return { status: false, data:null,  message: message|| 'Unable to register address' }
    }
  }

  async requestCreateOrder(request){

    try{

      const {
        order_id, order_date, pickup_location, channel_id, comment,
        billing_customer_name, billing_last_name, billing_address,
        billing_address_2, billing_city, billing_pincode, billing_state,
        billing_country, billing_email, billing_phone,
        shipping_is_billing, order_items, payment_method, shipping_charges,
        giftwrap_charges, transaction_charges, total_discount, sub_total,
        length, breadth, height, weight,
      } = request;

      const result = await this.axiosInstance.post('orders/create/adhoc', {
        order_id, order_date, pickup_location, channel_id, comment,
        billing_customer_name, billing_last_name, billing_address,
        billing_address_2, billing_city, billing_pincode, billing_state,
        billing_country, billing_email, billing_phone,
        shipping_is_billing, order_items, payment_method, shipping_charges,
        giftwrap_charges, transaction_charges, total_discount, sub_total,
        length, breadth, height, weight,
      });

      const { status, data } = this.validateData(result);

      if(!status) throw { message: data.message };

      return { status: true, data, message: 'Pickup request placed successfully!' }

    }
    catch (error){

      const message = this.parseError(error);

      return { status: false, data: null, message }
    }
  }

  async generateAWB(shipment_id){

    try{

      const result = await this.axiosInstance.post('courier/assign/awb', {
        shipment_id,
        courier_id: '',
      });

      const { status, data } = this.validateData(result);

      if(!status) throw { message: data.message };

      if(data.hasOwnProperty('status_code')) throw { message: data.message };

      const returnData = data.response.data;

      returnData.awb_assign_status = data.awb_assign_status;

      return { status: true, data: returnData, message: 'AWB assigned successfully!' }
    }
    catch (error){

      const message = this.parseError(error);

      return { status: false, data: null, message }
    }
  }

  async generateLabel(shipment_id){

    try {

      const result = await this.axiosInstance.post('courier/generate/label', {
        shipment_id,
      });

      const { status, data } = this.validateData(result);

      if(!status) throw { message: data.message };

      if(data.hasOwnProperty('status_code')) throw { message: data.message };

      const { not_created, label_url } = data;

      if(not_created.length>0) throw { message: 'Error while generating labels!' };

      return { status: true, data: label_url, message: 'Label generated successfully!' }
    }
    catch (error){
      const message = this.parseError(error);

      return { status: false, data: null, message }
    }
  }

  async generateInvoice(ids){

    try {

      const result = await this.axiosInstance.post('orders/print/invoice', {
        ids,
      });

      const { status, data } = this.validateData(result);

      if(!status) throw { message: data.message };

      if(data.hasOwnProperty('status_code')) throw { message: data.message };

      const { is_invoice_created, not_created, invoice_url } = data;

      if(!is_invoice_created) throw { code: 409, message: 'Unable to generate invoice!' };

      if(not_created.length>0) throw { message: 'Error while generating invoices!' };

      return { status: true, data: invoice_url, message: 'Invoice generated successfully!' }
    }
    catch (error){
      const message = this.parseError(error);

      return { status: false, data: null, message }
    }
  }

  async shipmentPickUp(shipment_id){

    try{

      const result = await this.axiosInstance.post('courier/generate/pickup', {
        shipment_id,
      });

      const { status, data } = this.validateData(result);

      if(!status) throw { message: data.message };

      if(data.hasOwnProperty('status_code')) throw { message: data.message };

      const returnData = {};

      const { pickup_scheduled_date, pickup_token_number,
        status: pickUpStatus, pickup_generated_date, data: message } = data.response;

      returnData.pickup_status = data.pickup_status;
      returnData.pickup_scheduled_date = pickup_scheduled_date;
      returnData.pickup_token_number = pickup_token_number;
      returnData.status = pickUpStatus;
      returnData.pickup_generated_date = pickup_generated_date;

      return { status: true, data: returnData, message }

    }
    catch (error){
      const message = this.parseError(error);

      return { status: false, data: null, message }
    }
  }

  async generateManifests(shipment_id){

    try {

      const result = await this.axiosInstance.post('manifests/generate', {
        shipment_id,
      });

      const { status, data } = this.validateData(result);

      if(!status) throw { message: data.message };

      if(data.hasOwnProperty('status_code')) throw { message: data.message };

      const { manifest_url } = data;

      return { status: true, data: manifest_url, message: 'Manifest generated successfully!' }
    }
    catch (error){
      const message = this.parseError(error);

      return { status: false, data: null, message }
    }
  }

  async printManifests(order_ids){

    try {

      const result = await this.axiosInstance.post('manifests/print', {
        order_ids,
      });

      const { status, data } = this.validateData(result);

      if(!status) throw { message: data.message };

      if(data.hasOwnProperty('status_code')) throw { message: data.message };

      const { manifest_url } = data;

      return { status: true, data: manifest_url, message: 'Manifest generated successfully!' }
    }
    catch (error){
      const message = this.parseError(error);

      return { status: false, data: null, message }
    }
  }

  async deleteOrder(ids){

    try {

      const result = await this.axiosInstance.post('orders/cancel', {
        ids,
      });

      const { status, data } = this.validateData(result);

      if(!status) throw { message: data.message };

      if(data.hasOwnProperty('status_code')) throw { message: data.message };

      return { status: true, data: true, message: 'Orders cancelled successfully!' }
    }
    catch (error){
      const message = this.parseError(error);

      return { status: false, data: null, message }
    }
  }

  validateData(result){

    if(result.status === 400){
      return { status: false, data: result.data }
    }
    else if(result.status === 412){
      return { status: false, data: result.data }
    }
    else if(result.status === 200){
      return { status: true, data: result.data }
    }
  }

  parseError(error){

    try{

      const {response} = error;

      if(!response) throw { message: error.message };

      const { data: {message} } = response;

      return message || 'Error while operating!'
    }
    catch(e) {

      return e.message
    }
  }
}

module.exports = ShipRocket;