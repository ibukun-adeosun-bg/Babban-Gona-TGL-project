module.exports = (sequelize, Sequelize) => {
    const Seed = sequelize.define("Seed", {
        seedType: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        }
    });

    Seed.associate = function(model) {
        Seed.hasMany(model.operator, {
            foreignKey: "seedType",
            onDelete: "cascade"
        })
    }

    return Seed
}