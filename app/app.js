const express = require("express");
const app = express(); 
const { getCategories, getReviews } = require("../controllers/controller")

app.use(express.json());

app.get('/api/categories', getCategories);
app.get('/api/reviews', getReviews);

// app.get()

app.use((request, response, next) => {
    response.status(404).send({ msg: "Path not found"})
})
app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: "Internal server error" });
  });

module.exports = app; 