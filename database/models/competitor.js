const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize

//const racing = require('./racing')
const Model = Sequelize.Model
class Competitor extends Model {}
Competitor.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    second_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    region: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    next_race: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'racings',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'competitor',
    timestamps: false
})

module.exports = Competitor