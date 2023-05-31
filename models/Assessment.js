module.exports = (sequelize, Sequelize) => {
    const Assessment = sequelize.define("Assessment", {
        sessionId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        fieldOfficerId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        questions: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: []
        },
        responses: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: []
        },
        score: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        submitted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    Assessment.associate = function(model) {
        Assessment.belongsTo(model.fieldOfficer, {
            foreignKey: "fieldOfficerId",
            onDelete: "cascade"
        })

        Assessment.belongsTo(model.operator, {
            foreignKey: "operatorId",
            onDelete: "cascade"
        })
    }

    return Assessment
}