const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');

const sequelize = require("./config/sequelize");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

sequelize.authenticate().then(() => {
    console.log('✅ Sequelize is now logged in.');
}).catch(err => console.log('❌ Unable to connect to the database:', err));

app.use('/game', gameRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`✅ Server started on port ${port}`);
})