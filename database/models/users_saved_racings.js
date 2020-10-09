const Sequelize = require('sequelize')
const sequelize = require('../connection.js').sequelize

const Model = Sequelize.Model
class Users_Saved_Racings extends Model {}
Users_Saved_Racings.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    racing_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'racings',
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'users_saved_racings',
    timestamps: false
})

module.exports = Users_Saved_Racings