module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Product", {
        productId: {
            type: Sequelize.STRING,
            allowNull: false,
            primarykey: true
        },
        productType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['maize', 'rice']]
            }
        },
        seedType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        operatorId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    })

    Product.associate = function(model) {
        Product.belongsTo(model.operator, {
            "foreignKey": "operatorId",
            "onDelete": "cascade"
        })
    }

    return Product
}