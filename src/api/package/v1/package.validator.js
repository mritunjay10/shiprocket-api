const { response } = require('@utils');

exports.requestCreateOrder = (req, res, next)=>{

  try{
    
    const {
      orderId, orderDate, pickupLocation, comment, billingCustomerName,
      billingLastName, billingAddress, billingAddressTwo , billingCity,
      billingPincode, billingState, billingCountry, billingEmail,
      billingPhone, orderItems, paymentMethod, shippingCharges,
      giftWrapCharges, transactionCharges, totalDiscount, subTotal,
      length, breadth, height, weight,
    } = req.body;

    if(!orderId) throw { code: 409, message: 'Invalid order Id!' };

    if(!orderDate) throw { code: 409, message: 'Invalid order date!' };

    if(!pickupLocation) throw { code: 409, message: 'Invalid pick location!' };

    if(!comment) throw { code: 409, message: 'Invalid comment!' };

    if(!billingCustomerName) throw { code: 409, message: 'Invalid customer name!' };

    if(!billingLastName) throw { code: 409, message: 'Invalid customer last name!' };

    if(!billingAddress) throw { code: 409, message: 'Invalid customer address!' };

    if(!billingCity) throw { code: 409, message: 'Invalid customer city!' };

    if(!billingPincode) throw { code: 409, message: 'Invalid customer pincode!' };

    if(billingPincode.length !== 6 ) throw { code: 409, message: 'Invalid customer pincode!' }

    if(!billingState ) throw { code: 409, message: 'Invalid customer state!' };

    if(!billingCountry ) throw { code: 409, message: 'Invalid customer country!' };

    if(!billingState ) throw { code: 409, message: 'Invalid customer state!' };

    if(!billingEmail) throw { code: 409, message: 'Invalid customer email!' };

    if(!billingPhone ) throw { code: 409, message: 'Invalid customer phone!' };

    const validPhone = global.phoneUtil.parseAndKeepRawInput(billingPhone, process.env.COUNTRY_CODE);

    if(!validPhone) throw { code: 409, message: 'Invalid phone!' };

    if(!orderItems) throw { code: 409, message: 'Invalid orders!' };

    if(orderItems.length <=0 ) throw { code: 409, message: 'Invalid orders!' };

    if(!paymentMethod) throw { code: 409,  message: 'Invalid payment methods!' };

    if(!['Prepaid','Postpaid'].includes(paymentMethod)) throw { code: 409,  message: 'Invalid payment methods!' };

    // if(!shippingCharges) throw { code: 409,  message: 'Invalid shipping charges!' };

    // if(!giftWrapCharges) throw { code: 409,  message: 'Invalid gift-wrap charges!' };

    // if(!transactionCharges) throw { code: 409,  message: 'Invalid transaction charges!' };

    // if(!totalDiscount) throw { code: 409,  message: 'Invalid transaction charges!' };

    if(!subTotal) throw { code: 409,  message: 'Invalid sub-total charges!' };

    if(!length) throw { code: 409,  message: 'Invalid package length!' };

    if(!breadth) throw { code: 409,  message: 'Invalid package breadth!' };

    if(!height) throw { code: 409,  message: 'Invalid package height!' };

    if(!weight) throw { code: 409,  message: 'Invalid package weight!' };

    next()
  }
  catch (e){

    response.error(res, e)
  }
};


exports.packageOrders = async(req, res, next)=>{

  try{

    const orders = [];

    const { orderItems } = req.body;

    await orderItems.forEach(datum=>{

      const { name, sku, units, sellingPrice, discount, tax, hsn } = datum;

      if(!sku) throw { code: 409, message: 'Invalid order sku' };

      if(!name) throw { code: 409, message: `SKU-${sku}: Invalid order name` };

      if(!units) throw { code: 409, message: `SKU-${sku}: Invalid order units` };

      if(!sellingPrice) throw { code: 409, message: `SKU-${sku}: Invalid order selling price` };

      // if(!discount) throw { code: 409, message: `SKU-${sku}: Invalid  order discount` };

      if(!tax) throw { code: 409, message: `SKU-${sku}: Invalid order tax` };

      if(!hsn) throw { code: 409, message: `SKU-${sku}: Invalid order hsn` };

      orders.push({
        name, sku,
        units, discount,
        selling_price: sellingPrice,
        tax, hsn,
      });

    });

    req.orderItems = orders;

    next()

  }
  catch (e){

    response.error(res, e)
  }
};

exports.packageParams = async (req, res, next) => {
  try {

    const {
      orderId, orderDate, pickupLocation, comment, billingCustomerName,
      billingLastName, billingAddress, billingAddressTwo , billingCity,
      billingPincode, billingState, billingCountry, billingEmail,
      billingPhone, orderItems, paymentMethod, shippingCharges,
      giftWrapCharges, transactionCharges, totalDiscount, subTotal,
      length, breadth, height, weight,
    } = req.body;

    req.order = {
      order_id: orderId,
      order_date: orderDate,
      pickup_location: pickupLocation,
      comment,
      billing_customer_name: billingCustomerName,
      billing_last_name: billingLastName, billing_address: billingAddress,
      billing_address_2: billingAddressTwo,
      billing_city: billingCity, billing_pincode: billingPincode,
      billing_state: billingState,
      billing_country: billingCountry, billing_email: billingEmail,
      billing_phone: billingPhone,
      order_items: req.orderItems,
      shipping_is_billing: true,
      payment_method: paymentMethod,
      shipping_charges: shippingCharges,
      giftwrap_charges: giftWrapCharges,
      transaction_charges: transactionCharges,
      total_discount: totalDiscount,
      sub_total: subTotal,
      length, breadth, height, weight,
    };

    next()
  }
  catch (e) {
    response.error(res, e)
  }
};

exports.assignAWB = (req, res, next) =>{

  try{
    const { shipmentId } = req.body;

    if(!shipmentId) throw { code: 409, message: 'Invalid shipment id' };

    next()
  }
  catch (e){
    response.error(res, e)
  }
};

exports.shipmentIds = (req, res, next) =>{

  try{
    const { shipmentIds } = req.body;

    if(!shipmentIds) throw { code: 409, message: 'Invalid shipment ids' };

    if(!Array.isArray(shipmentIds)) throw { code: 409, message: 'Invalid shipment ids' };

    if(shipmentIds.length <=0 ) throw { code: 409, message: 'Invalid shipment ids' };

    next()
  }
  catch (e){
    response.error(res, e)
  }
};

exports.orderIds = (req, res, next) =>{

  try{
    const { orderIds } = req.body;

    if(!orderIds) throw { code: 409, message: 'Invalid order ids' };

    if(!Array.isArray(orderIds)) throw { code: 409, message: 'Invalid order ids' };

    if(orderIds.length <=0 ) throw { code: 409, message: 'Invalid order ids' };

    next()
  }
  catch (e){
    response.error(res, e)
  }
};

/*exports.shipmentPickUp = (req, res, next) =>{

  try{
    const { shipmentIds } = req.body;

    if(!shipmentIds) throw { code: 409, message: 'Invalid shipment ids' };

    if(!Array.isArray(shipmentIds)) throw { code: 409, message: 'Invalid shipment ids' };

    if(shipmentIds.length <=0 ) throw { code: 409, message: 'Invalid shipment ids' };

    next()
  }
  catch (e){
    response.error(res, e)
  }
};

exports.generateManifests = (req, res, next) =>{

  try{
    const { shipmentIds } = req.body;

    if(!shipmentIds) throw { code: 409, message: 'Invalid shipment ids' };

    if(!Array.isArray(shipmentIds)) throw { code: 409, message: 'Invalid shipment ids' };

    if(shipmentIds.length <=0 ) throw { code: 409, message: 'Invalid shipment ids' };

    next()
  }
  catch (e){
    response.error(res, e)
  }
};*/
/*

exports.printManifests = (req, res, next) =>{

  try{
    const { orderIds } = req.body;

    if(!orderIds) throw { code: 409, message: 'Invalid order ids' };

    if(!Array.isArray(orderIds)) throw { code: 409, message: 'Invalid order ids' };

    if(orderIds.length <=0 ) throw { code: 409, message: 'Invalid order ids' };

    next()
  }
  catch (e){
    response.error(res, e)
  }
};*/
