const express = require('express');
const router = express.Router();

const { pickUpAddressValidator, pickUpAddressController } = require('@api/pick-up-address/v1');

/* GET users listing. */
router.post('/create', pickUpAddressValidator.registerAddress, pickUpAddressController.registerAddress);

module.exports = router;
