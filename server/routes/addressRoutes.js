const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');
const { validateCreateAddress, validateUpdateAddress } = require('../validations/addressValidation');

// routes with validations
router.get('/', AddressController.getAllAddresses);
router.get('/:id', AddressController.getAddressById);
router.post('/', validateCreateAddress, AddressController.createAddress);
router.put('/:id', validateUpdateAddress, AddressController.updateAddress);
router.delete('/:id', AddressController.deleteAddress);

module.exports = router;
