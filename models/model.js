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

const fetchReviewById = (review_id) => {
    const queryStr = `SELECT * FROM reviews WHERE review_id = $1;`
    return db.query(queryStr, [review_id])
    .then(({rows}) => {
        const result = rows[0];
    if (!result) {
        return Promise.reject({ status: 404, msg: "Non-existant review_id"})
    }
    return result;
}
)}

const fetchCommentsByReviewId = (review_id) => {
    const queryStr = `SELECT * FROM comments WHERE review_id = $1
    ORDER BY created_at ASC;`
    return db.query(queryStr, [review_id])
    .then(({rows}) => {
        const result = rows
        if (!result) {
            return Promise.reject({ status: 404, msg: "Non-existant review_id"}
            )}
            return result;
    })
}

const addComment = (review_id, {username, body}) => {
    const queryStr = `INSERT INTO comments (review_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *;`
    return db.query(queryStr, [review_id, username, body])
    .then((result) => result.rows)
}

module.exports = { fetchCategories, fetchReviews, fetchReviewById, fetchCommentsByReviewId, addComment } 
