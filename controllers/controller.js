const { fetchCategories, fetchReviews, fetchReviewById, fetchCommentsByReviewId } = require("../models/model");

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

const getCommentsByReviewId = (request, response, next) => {
    const { review_id } = request.params;
    fetchCommentsByReviewId(review_id).then((comments) => {
        response.status(200).send(comments)
    })
    .catch(next)
}



module.exports = { getCategories, getReviews, getReviewById, getCommentsByReviewId }