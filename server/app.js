const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const cors = require('cors');

const app = express();


app.use(bodyParser.json());


app.use(cors());
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const addressRoutes = require('./routes/addressRoutes');
app.use('/api/addresses', addressRoutes);



sequelize.sync().then(() => {
    app.listen(5500, () => {
        console.log('Server is running!');
    });
});
