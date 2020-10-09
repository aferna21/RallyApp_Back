const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize

const Model = Sequelize.Model
class User extends Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    competitor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'competitors',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false
})

module.exports = User