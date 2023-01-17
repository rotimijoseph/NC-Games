const db = require("../db/connection")

const fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then((result) => result.rows)
}

const fetchReviews = () => {
    let queryStr = `SELECT owner, title, designer, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes,
    COUNT(comments.review_id) AS comment_count 
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
    ORDER BY created_at DESC;`
    return db.query(queryStr)
    .then((result) => result.rows)  
}

module.exports = { fetchCategories, fetchReviews } 