module.exports = (sequelize, Sequelize) => {
    const GovernmentIdType = sequelize.define("Identification_type", {
        governmentIdentificationType: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        isDisabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    GovernmentIdType.associate = function(model) {
        GovernmentIdType.hasMany(model.fieldOfficer, {
            foreignKey: "governmentIdentificationType",
            onDelete: "cascade"
        })
    }

    GovernmentIdType.afterSync(async () => {
        const validGovernmentIDType = ["NIN Card", "Voter's Card", "Driver's License"];
        const existingIdTypes = await GovernmentIdType.findAll({
          attributes: ['governmentIdentificationType'],
        });
        const existingIdTypeNames = existingIdTypes.map(s => s.governmentIdentificationType);
    
        const newIdType = validGovernmentIDType.filter(s => !existingIdTypeNames.includes(s));
        const IdTypeRecords = newIdType.map(s => ({ governmentIdentificationType: s }));
    
        if (IdTypeRecords.length) {
          await GovernmentIdType.bulkCreate(IdTypeRecords);
        }
    });

    return GovernmentIdType
}