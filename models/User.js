module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                min: 8
            }
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
            "foreignKey": "username",
            "onDelete": "cascade"
        });

        User.hasOne(model.fieldOfficer, {
            "foreignKey": "username",
            "onDelete": "cascade"
        });

    }


    return User
}