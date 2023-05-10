module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("State", {
        state: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        }
    });

    State.associate = function(model) {
        State.hasMany(model.operator, {
            foreignKey: "state",
            onDelete: "cascade"
        })
    }

    return State
}