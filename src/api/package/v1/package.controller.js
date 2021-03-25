const { response } = require('@utils');
const { ShipRocket  } = require('@helper');

exports.requestCreateOrder = async (req, res)=>{

  try{

    const shipRocket = new ShipRocket(req.shipRocket);

    const { status, data, message } = await shipRocket.requestCreateOrder(req.order);

    if(!status) throw { code: 409, message };

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){

    response.error(res, e)
  }
};

exports.assignAWB = async (req, res)=>{

  try{

    const { shipmentId } = req.body;

    const shipRocket = new ShipRocket(req.shipRocket);

    const { status, data, message } = await shipRocket.generateAWB(shipmentId);

    if(!status) throw { code: 409, message };

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};


exports.generateLabel = async (req, res)=>{

  try{

    const { shipmentIds } = req.body;

    const shipRocket = new ShipRocket(req.shipRocket);

    const { status, data, message } = await shipRocket.generateLabel(shipmentIds);

    if(!status) throw { code: 409, message };

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};

exports.generateInvoice = async (req, res)=>{

  try{

    const { orderIds } = req.body;

    const shipRocket = new ShipRocket(req.shipRocket);

    const { status, data, message } = await shipRocket.generateInvoice(orderIds);

    if(!status) throw { code: 409, message };

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};

exports.shipmentPickUp = async (req, res)=>{

  try{

    const { shipmentIds } = req.body;

    const shipRocket = new ShipRocket(req.shipRocket);

    const { status, data, message } = await shipRocket.shipmentPickUp(shipmentIds);

    if(!status) throw { code: 409, message };

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};

exports.generateManifests = async (req, res)=>{

  try{

    const { shipmentIds } = req.body;

    const shipRocket = new ShipRocket(req.shipRocket);

    const { status, data, message } = await shipRocket.generateManifests(shipmentIds);

    if(!status) throw { code: 409, message };

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};


exports.printManifests = async (req, res)=>{

  try{

    const { orderIds } = req.body;

    const shipRocket = new ShipRocket(req.shipRocket);

    const { status, data, message } = await shipRocket.printManifests(orderIds);

    if(!status) throw { code: 409, message };

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};

exports.deleteOrder = async (req, res)=>{

  try{

    const { orderIds } = req.body;

    const shipRocket = new ShipRocket(req.shipRocket);

    const { status, data, message } = await shipRocket.deleteOrder(orderIds);

    if(!status) throw { code: 409, message };

    response.success(res, { code: 200, message, data, pagination: null });
  }
  catch (e){
    response.error(res, e)
  }
};