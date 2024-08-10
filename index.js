require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route')

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.use("/api/products", productRoute);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Connection to MongoDB failed', error);
        process.exit(1);
    }
};

const startServer = async () => {
    await connectDB();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
};

startServer();