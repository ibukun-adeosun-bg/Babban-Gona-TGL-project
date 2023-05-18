module.exports = (sequelize, Sequelize) => {
    const NigeriaStatesLGAs = require("nigeria-states-lgas")
    const State = sequelize.define("State", {
        state: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        isDisabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    State.associate = function(model) {
        State.hasMany(model.operator, {
            foreignKey: "state",
            onDelete: "cascade"
        })
    }

    State.associate = function(model) {
        State.hasMany(model.fieldOfficer, {
            foreignKey: "state",
            onDelete: "cascade"
        })
    }

    State.associate = function(model) {
        State.hasMany(model.lga, {
            foreignKey: "state",
            onDelete: "cascade"
        })
    }

    State.afterSync(async () => {
        const validStates = NigeriaStatesLGAs.states();
        const existingStates = await State.findAll({
          attributes: ['state'],
        });
        const existingStateNames = existingStates.map(s => s.state);
    
        const newStates = validStates.filter(s => !existingStateNames.includes(s));
        const stateRecords = newStates.map(s => ({ state: s }));
    
        if (stateRecords.length) {
          await State.bulkCreate(stateRecords);
        }
    });

    return State
}