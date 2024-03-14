const express= require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/db');
const authRoute = require('./routes/authRoute');
const CategoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const PORT = process.env.PORT || 8080;
const cors = require('cors');

//REST OBJECT
const app = express();

//ROUTES
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", productRoutes);


//REST API
app.get("/", (req, res) => {
    res.send('<h1>Welcome</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
