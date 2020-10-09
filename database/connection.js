// Connect to ddbb
const Sequelize = require('sequelize');

//DELETED IP AND PASSWORD TO UPLOAD :)))
/*const sequelize = new Sequelize('', '', '', {
    host: '',
    dialect: 'postgres',
    logging: false
});*/

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
