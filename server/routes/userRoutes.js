const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { validateCreateUser, validateUpdateUser } = require('../validations/userValidation');

// routes with validations
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', validateCreateUser, UserController.createUser);
router.put('/:id', validateUpdateUser, UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;