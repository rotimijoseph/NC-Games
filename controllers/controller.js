const { fetchCategories, fetchReviews } = require("../models/model");

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


module.exports = { getCategories, getReviews }