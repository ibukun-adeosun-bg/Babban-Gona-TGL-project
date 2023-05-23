module.exports = (sequelize, Sequelize) => {
    const FieldOfficer = sequelize.define("Field_officer", {
        fieldOfficerId: {
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
        sex: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [["male", "female"]]
            }
        },
        dateOfBirth: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        BVN: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: 11
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
        Hub: {
            type: Sequelize.STRING,
            allowNull: false
        },
        governmentIdentificationID: {
            type: Sequelize.STRING,
            allowNull: false
        },
        governmentIdentificationType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [["Voter's Card", "International Passport", "NIN Card", "Drivers' License"]]
            }
        },
        governmentIdentificationImage: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        operatorId: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    FieldOfficer.associate = function(model) {
        FieldOfficer.belongsTo(model.lga, {
            foreignKey: "localGovernmentArea",
            onDelete: "cascade"
        });

        FieldOfficer.belongsTo(model.state, {
            foreignKey: "state",
            onDelete: "cascade"
        });

        FieldOfficer.belongsTo(model.user, {
            "foreignKey": "username",
            "onDelete": "cascade"
        });

        FieldOfficer.belongsTo(model.operator, {
            "foreignKey": "operatorId",
            "onDelete": "cascade"
        });

        FieldOfficer.hasMany(model.assessment, {
            "foreignKey": "fieldOfficerId",
            "onDelete": "cascade"
        });
    }

    return FieldOfficer
}