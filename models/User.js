module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        userId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [["Operator", "Admin"]]
            }
        }
    })

    User.associate = function(model) {
        User.hasOne(model.operator, {
            "foreignKey": "userId",
            "onDelete": "cascade"
        });
    }

    return User
}