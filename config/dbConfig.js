const Sequelize = require("sequelize")
const dotenv = require("dotenv")
dotenv.config()

const configDetails = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    DIALECT: "mysql",
    POOL: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000
    }
}

const sequelize = new Sequelize(
    configDetails.DATABASE,
    configDetails.USER,
    configDetails.PASSWORD, {
        host: configDetails.HOST,
        dialect: configDetails.DIALECT,
        pool: {
            max: configDetails.MAX,
            min: configDetails.MIN,
            acquire: configDetails.ACQUIRE,
            idle: configDetails.IDLE
        }
    }
);

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

const User = require("../models/User.js")(sequelize, Sequelize)
const Product = require("../models/Product.js")(sequelize, Sequelize)
const Operator = require("../models/Operator.js")(sequelize, Sequelize)
const Lga = require("../models/Lga.js")(sequelize, Sequelize)
const State = require("../models/States.js")(sequelize, Sequelize)
const Seed = require("../models/Seed.js")(sequelize, Sequelize)

db.user = User
db.product = Product
db.operator = Operator
db.lga = Lga
db.state = State
db.seed = Seed

Operator.associate(db)
State.associate(db)
Lga.associate(db)
Product.associate(db)
Seed.associate(db)

module.exports = db