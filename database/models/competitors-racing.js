const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize

const Model = Sequelize.Model
class Competitor_Racings extends Model {}
Competitor_Racings.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    },
}, {
    sequelize,
    modelName: 'competitor_racing',
    timestamps: false
})

module.exports = Competitor_Racings