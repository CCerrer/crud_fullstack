const { User } = require("./User");
const { Address } = require("./Address");

/* MAKING RELATIONSHIP 1:N */
User.belongsTo(Address, {foreignKey: 'address_id'});
Address.hasMany( User, {as: 'users', foreignKey: 'address_id'});

module.exports = {
    User,
    Address,
};