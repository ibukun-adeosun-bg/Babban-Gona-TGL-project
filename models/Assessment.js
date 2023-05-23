module.exports = (sequelize, Sequelize) => {
    const Assessment = sequelize.define("Assessment", {
        fieldOfficerId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        operatorId: {
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