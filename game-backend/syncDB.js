const models = require('./models/index')
const sequelize = require("./config/sequelize");

sequelize.sync({force: true}).then(() => {
    console.log('✅ Database is synced.');
    process.exit();
}).catch(err => {
    console.log('❌ Error during sync:', err)
    process.exit(1);
});