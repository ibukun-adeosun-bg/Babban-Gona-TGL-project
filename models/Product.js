module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Product", {
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        }
    })

    Product.associate = function(model) {
        Product.hasMany(model.operator, {
            "foreignKey": "productName",
            "onDelete": "cascade"
        })
    }

    return Product
}