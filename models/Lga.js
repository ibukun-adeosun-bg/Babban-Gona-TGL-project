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

    return Lga
}