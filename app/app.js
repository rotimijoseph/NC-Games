const express = require("express");
const app = express(); 
const { getCategories } = require("../controllers/controller")

app.use(express.json());

app.get('/api/categories', getCategories);

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: "Internal server error" });
  });

module.exports = app; 