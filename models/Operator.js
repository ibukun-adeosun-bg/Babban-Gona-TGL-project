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
            unique: true,
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
        nin: {
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
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    })

    Operator.associate = function(model) {
        Operator.belongsTo(model.user, {
            "foreignKey": "username",
            "onDelete": "cascade"
        })
    }

    Operator.associate = function(model) {
        Operator.hasMany(model.product, {
            "foreignKey": "operatorId",
            "onDelete": "cascade"
        })
    }

    Operator.associate = function(model) {
        Operator.belongsTo(model.state, {
            foreignKey: "state",
            onDelete: "cascade"
        })
    }

    Operator.associate = function(model) {
        Operator.belongsTo(model.lga, {
            foreignKey: "localGovernmentArea",
            onDelete: "cascade"
        })
    }

    return Operator
}