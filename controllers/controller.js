const { fetchCategories } = require("../models/model");

const getCategories = (request, response, next) => {
    fetchCategories().then((categories) => 
        response.status(200).send(categories)
    )
    .catch(next)
}

module.exports = { getCategories }