// Connect to ddbb
const Sequelize = require('sequelize');
const sequelize = new Sequelize('rallydb', 'rally', 'covid19', {
    host: '212.183.252.91',
    dialect: 'postgres',
    logging: false
});

module.exports = {
    connection: function() {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    },
    sequelize
};