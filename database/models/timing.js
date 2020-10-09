const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize


const racing = require('./racing')
const competitor = require('./competitor')
const Model = Sequelize.Model
class Timing extends Model {}
Timing.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    timing: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true
    },
    racing_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: racing,
            key: 'id'
        }
    },
    competitor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: competitor,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'timing',
    timestamps: false
})

module.exports = Timing