const express = require("express");
const app = express(); 
const { getCategories, getReviews, getReviewById, getCommentsByReviewId } = require("../controllers/controller")

app.use(express.json());

app.get('/api/categories', getCategories);

app.get('/api/reviews', getReviews);

app.get('/api/reviews/:review_id', getReviewById);

app.get('/api/reviews/:review_id/comments', getCommentsByReviewId);



app.use((request, response, next) => {
    response.status(404).send({ msg: "Path not found"})
})

app.use((err, request, response, next) => {
    console.log(err)
    if(err.status && err.msg) {
        response.status(err.status).send({msg: err.msg})
    }
})

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: "Internal server error" });
  });

module.exports = app; 