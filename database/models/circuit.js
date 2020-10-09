const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize

const Model = Sequelize.Model
class Circuit extends Model {}
Circuit.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.GEOMETRY('POINT', 4326),
        allowNull: true
    },
    tracing: {
        type: Sequelize.GEOMETRY('LINESTRING', 4326),
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'circuit',
    timestamps: false
})

module.exports = Circuit