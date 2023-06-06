module.exports = (sequelize, Sequelize) => {
    const FieldOfficer = sequelize.define("Field_officer", {
        fieldOfficerId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
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
            allowNull: false,
            unique: true
        },
        governmentIdentificationType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        governmentIdentificationImage: {
            type: Sequelize.STRING,
            allowNull: false
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