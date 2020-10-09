const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize

const user = require('./user')
const Model = Sequelize.Model
class Organizer extends Model {}
Organizer.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    organizer_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'organizer',
    timestamps: false
})

module.exports = Organizer