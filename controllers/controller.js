const { fetchCategories, fetchReviews, fetchReviewById } = require("../models/model");

const getCategories = (request, response, next) => {
    fetchCategories().then((categories) => 
        response.status(200).send(categories)
    )
    .catch(next)
}

const getReviews = (request, response) => {
    fetchReviews().then((reviews) => {
        response.status(200).send(reviews)
    })
}

const getReviewById = (request, response, next) => {
    const { review_id } = request.params;
    fetchReviewById(review_id).then((review) => {
        response.status(200).send(review)
    })
    .catch(next)
}


module.exports = { getCategories, getReviews, getReviewById }