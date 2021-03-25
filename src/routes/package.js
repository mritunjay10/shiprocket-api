const express = require('express');
const router = express.Router();

const { packageValidator, packageController } = require('@api/package/v1');

/* GET users listing. */
router.post('/create-order', packageValidator.requestCreateOrder, packageValidator.packageOrders, packageValidator.packageParams, packageController.requestCreateOrder);

router.post('/assign-awb', packageValidator.assignAWB, packageController.assignAWB);

router.post('/generate-label', packageValidator.shipmentIds, packageController.generateLabel);

router.post('/generate-invoice', packageValidator.orderIds, packageController.generateInvoice);

router.post('/shipment-pickup', packageValidator.shipmentIds, packageController.shipmentPickUp);

router.post('/generate-manifest', packageValidator.shipmentIds, packageController.generateManifests);

router.post('/print-manifest', packageValidator.orderIds, packageController.printManifests);

router.delete('/delete-order', packageValidator.orderIds, packageController.deleteOrder);

module.exports = router;
