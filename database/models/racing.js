const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize



const Model = Sequelize.Model
class Racing extends Model {}
Racing.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    racing_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    in_progress:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    circuit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'circuits',
            key: 'id'
        }
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    organizer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'organizers',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'racings',
    timestamps: false
})

module.exports = Racing