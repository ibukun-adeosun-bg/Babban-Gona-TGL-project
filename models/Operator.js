const NigeriaStatesLGAs = require("nigeria-states-lgas");
const { createError } = require("../middleware/error");

module.exports = (sequelize, Sequelize) => {
    const statesLGAs = {}
    const validStates = NigeriaStatesLGAs.states()
    validStates.forEach(state => {
        const lgas = NigeriaStatesLGAs.lgas(state);
        statesLGAs[state] = lgas;
    });
    
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
            allowNull: false,
            validate: {
                notEmpty: true,
                async validState(state) {
                    if (!validStates.includes(state)) {
                        throw new Error("Invalid State")
                    }
                }
            }
        },
        localGovernmentArea: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                async validLGA(lga) {
                    const state = this.state
                    if (!statesLGAs[state].includes(lga)) {
                        throw new Error("Invalid Local Government Area")
                    }
                }
            }
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
            validate: {
                len: 11
            }
        },
        profilePic: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
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