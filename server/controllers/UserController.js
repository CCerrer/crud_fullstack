const { User, Address } = require('../models/_relation');
const { validationResult } = require('express-validator');

/* USER CRUD OPERATIONS */

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll({
                include: [ Address ],
            });
            return res.status(200).json(users);
        } catch (error) {
            console.log("Error in getAllUsers: ", error);
            return res.status(500).json(error);
        }
    },

    // get user by id
    async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [ Address ],
            });
            return res.status(200).json(user);
        } catch (error) {
            console.log("Error in getUserById: ", error);
            return res.status(500).json(error);
        }
    },

    // create user
    async createUser(req, res) {
        // handle validation errors
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        const { userName, nickname, email, phone, userPassword } = req.body;
        try {
            const user = await User.create({ userName, nickname, email, phone, userPassword });
            return res.status(201).json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // update user
    async updateUser(req, res) {
        // handle validation errors
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }

        const { userName, nickname, email, phone, userPassword, address_id } = req.body;
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.update({ userName, nickname, email, phone, userPassword, address_id });
            await user.reload({ include: [Address] })

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.destroy();
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}