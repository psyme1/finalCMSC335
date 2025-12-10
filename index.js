const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
require("dotenv").config({
    path: path.resolve(__dirname, "./.env")
})

const app = express();
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => console.log("Mongoose connected")).catch(error => console.log(error));

const wr = require("./weather");
app.use('/', wr);

const port = 3000
app.listen(port, () => console.log(`Server running on port ${port}`))