module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Product", {
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        isDisabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    Product.associate = function(model) {
        Product.hasMany(model.operator, {
            "foreignKey": "productName",
            "onDelete": "cascade"
        })
    }

    Product.afterSync(async () => {
        const validProductName = ["Maize", "Rice", "Sorghum", "Beans"];
        const existingProductName = await Product.findAll({
          attributes: ['productName'],
        });
        const existingProductNames = existingProductName.map(s => s.productName);
    
        const newProduct = validProductName.filter(s => !existingProductNames.includes(s));
        const productRecords = newProduct.map(s => ({ productName: s }));
    
        if (productRecords.length) {
          await Product.bulkCreate(productRecords);
        }
    });

    return Product
}