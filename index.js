require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const helper = require("./helper");
const env = process.env.NODE_ENV;
const port = (env === 'dev') ? process.env.DEV_APP_PORT : process.env.PROD_APP_PORT;

const choresRouter = require("./routes/choresRoutes");

app.use(cors()); 
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/api", (req, res) => {
    res.json({ 
        message: `Welcome to API REST ${(env === 'dev') ? 'DEVELOPMENT ENVIROMENT' : 'PRODUCTION ENVIROMENT' }`,
        description: "",
        version:  '1.0.0.0'
    });
});

app.use("/api/task", choresRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ success: false, message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});