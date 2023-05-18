module.exports = (sequelize, Sequelize) => {
    const Lga = sequelize.define("Lga", {
        localGovernmentArea: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Lga.associate = function(model) {
        Lga.hasMany(model.operator, {
            foreignKey: "localGovernmentArea",
            onDelete: "cascade"
        })
    }

    Lga.associate = function(model) {
        Lga.belongsTo(model.state, {
            foreignKey: "state",
            onDelete: "casacde"
        })
    }

    Lga.associate = function(model) {
        Lga.hasMany(model.fieldOfficer, {
            foreignKey: "localGovernmentArea",
            onDelete: "cascade"
        })
    }

    return Lga
}