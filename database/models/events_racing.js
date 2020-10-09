const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize

const Model = Sequelize.Model
class Events_racing extends Model {}
Events_racing.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start_hour: {
        type: Sequelize.DATE,
        allowNull: true
    },
    end_hour: {
        type: Sequelize.DATE,
        allowNull: true
    },
    racing_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'racings',
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'events_racing',
    timestamps: false
})

module.exports = Events_racing