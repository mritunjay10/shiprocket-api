const express = require('express');
const router = express.Router();

const { packageValidator, packageController } = require('@api/package/v1');

/* GET users listing. */
router.post('/request-pickup', packageValidator.requestPickUp, packageController.requestPickUp);

module.exports = router;
