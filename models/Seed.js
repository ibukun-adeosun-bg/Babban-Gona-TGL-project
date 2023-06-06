module.exports = (sequelize, Sequelize) => {
    const Seed = sequelize.define("Seed", {
        seedType: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        isDisabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    Seed.associate = function(model) {
        Seed.hasMany(model.operator, {
            foreignKey: "seedType",
            onDelete: "cascade"
        })
    }

    Seed.afterSync(async () => {
        const validSeedType = ["Large", "Medium", "Small"];
        const existingSeedType = await Seed.findAll({
          attributes: ['seedType'],
        });
        const existingSeedTypes = existingSeedType.map(s => s.seedType);
    
        const newSeedType = validSeedType.filter(s => !existingSeedTypes.includes(s));
        const seedTypeRecords = newSeedType.map(s => ({ seedType: s }));
    
        if (seedTypeRecords.length) {
          await Seed.bulkCreate(seedTypeRecords);
        }
    });

    return Seed
}