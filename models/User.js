module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
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
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [["Operator", "Field Officer", "Admin"]]
            }
        }
    })

    User.associate = function(model) {
        User.hasOne(model.operator, {
            "onDelete": "cascade",
            "foreignKey": "username"
        })
    }
    return User
}