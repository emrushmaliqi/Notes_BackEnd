"use strict";
require("dotenv").config();
const express = require("express");
// express app
const app = express();
// listen for request
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to the app" });
});
