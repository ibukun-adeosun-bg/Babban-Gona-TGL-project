const { v4: uuidv4 } = require("uuid")

module.exports = (sequelize, Sequelize) => {
    const Operator = sequelize.define("Operator", {
        operatorId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: 11
            }
        },
        nationality: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['Nigeria']]
            }
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        localGovernmentArea: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sex: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['male', 'female']]
            }
        },
        dateOfBirth: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        identificationNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: 11
            }
        },
        profilePic: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        }
    })

    Operator.associate = function(model) {
        Operator.belongsTo(model.user, {
            "foreignKey": "userId",
            "onDelete": "cascade"
        })
    }

    Operator.associate = function(model) {
        Operator.hasMany(model.product, {
            "foreignKey": "operatorId",
            "onDelete": "cascade"
        })
    }

    return Operator
}