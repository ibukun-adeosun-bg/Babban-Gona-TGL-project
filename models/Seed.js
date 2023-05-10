module.exports = (sequelize, Sequelize) => {
    const Seed = sequelize.define("Seed", {
        SeedType: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        }
    });

    Seed.associate = function(model) {
        Seed.hasMany(model.product, {
            foreignKey: "seedType",
            onDelete: "cascade"
        })
    }

    return Seed
}