const cron = require('node-cron');

const { ShipRocket } = require('@helper');
const { Redis } = require('@redis');

cron.schedule('00 1 * * *', async ()=>{

  try{

    const { status, data, message } = await new ShipRocket(null).login();

    if(!status) throw { message };

    await Redis.set(process.env.REDIS_SHIPROCKET_KEY, data.token)
  }
  catch (e){

    console.log(e.message)
  }
});