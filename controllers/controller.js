const { fetchCategories, fetchReviews, fetchReviewById, fetchCommentsByReviewId, addComment, changeReview, fetchUsers } = require("../models/model");

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
        Promise.all([fetchReviewById(review_id), fetchCommentsByReviewId(review_id)]).then((result1) => {
            response.status(200).send(comments)
        })
        .catch(next)
    })
}

const postComments = (request, response, next) => {
    const { review_id } = request.params;
    const { username, body } = request.body; 
    addComment(review_id, {username, body}).then((newComment) => {
        response.status(201).send(newComment)
    })
    .catch(next)
}

const updateReview = (request, response, next) => {
    const { review_id } = request.params;
    const { inc_votes } = request.body
    changeReview(review_id, {inc_votes}).then((update) => {
        response.status(200).send(update)
    })
    .catch(next)
}

const getUsers = (request, response) => {
    fetchUsers().then((users) => {
        response.status(200).send(users)
    })
}

module.exports = { getCategories, getReviews, getReviewById, getCommentsByReviewId, postComments, updateReview, getUsers }