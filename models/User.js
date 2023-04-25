module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: 8
            }
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
        }
    })

    User.associate = function(model) {
        User.hasOne(model.operator, {
            "onDelete": "cascade",
            "foreignKey": "userId"
        })
    }
    return User
}