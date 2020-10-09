const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize



const Model = Sequelize.Model
class Classification extends Model {}
Classification.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    classification: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true
    },
    car: {
        type: Sequelize.STRING,
        allowNull: true
    },
    competitor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'competitors',
            key: 'id'
        }
    },
    racing_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'racings',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'classification',
    timestamps: false
})

module.exports = Classification