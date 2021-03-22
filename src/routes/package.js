const express = require('express');
const router = express.Router();

const { packageValidator, packageController } = require('@api/package');

/* GET users listing. */
router.post('/request-pickup', packageValidator.requestPickUp, packageController.requestPickUp);

module.exports = router;
