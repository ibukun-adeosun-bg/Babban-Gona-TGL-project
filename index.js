const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const productRoutes = require("./routes/productRoutes.js")
const operatorRoutes = require("./routes/operatorRoutes.js")
const db = require("./config/dbConfig.js")

db.sequelize.authenticate()
    .then(() => {
        console.log("Database Connection Successful");
    }).catch(err => {
        console.log(err);
    })

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Re Syncing has been done");
    }).catch(err => {
        console.log(err);
    })

const app = express()
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use(cors())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/users", operatorRoutes)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something Went Wrong!!!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Backend Server is currently running on port ${PORT}`);
})