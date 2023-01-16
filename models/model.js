const db = require("../db/connection")

const fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then((result) => result.rows)
}


module.exports = { fetchCategories } 