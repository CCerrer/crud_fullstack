const { Address } = require('../models/_relation');
const { validationResult } = require('express-validator');

/* ADDRESS CRUD OPERATIONS */

module.exports = {
    // get all addresses
  async getAllAddresses(req, res) {
    try {
      const addresses = await Address.findAll();
      return res.status(200).json(addresses);
    } catch (error) {
      console.error('Error in getAllAddresses:', error);
      return res.status(500).json(error);
    }
  },

  // get address by id
  async getAddressById(req, res) {
    try {
      const address = await Address.findByPk(req.params.id);
      if (!address) {
        return res.status(404).json({ error: 'Address not found' });
      }
      return res.status(200).json(address);
    } catch (error) {
      console.error('Error in getAddressById:', error);
      return res.status(500).json(error);
    }
  },

  // create address
  async createAddress(req, res) {
    // handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const { street, number, complement, city, state, cep } = req.body;
    try {
      const address = await Address.create({ street, number, complement, city, state, cep });
      return res.status(201).json(address);
    } catch (error) {
      console.error('Error creating address:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

    // update address
  async updateAddress(req, res) {
    // handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const { street, number, complement, city, state, cep } = req.body;
    try {
      const address = await Address.findByPk(req.params.id);
      if (!address) {
        return res.status(404).json({ error: 'Address not found' });
      }

      await address.update({ street, number, complement, city, state, cep });
      await address.reload();

      return res.status(200).json(address);
    } catch (error) {
      console.error('Error updating address:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

    // delete address
  async deleteAddress(req, res) {
    try {
      const address = await Address.findByPk(req.params.id);
      if (!address) {
        return res.status(404).json({ error: 'Address not found' });
      }

      await address.destroy();
      return res.status(204).json();
    } catch (error) {
      console.error('Error deleting address:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};
