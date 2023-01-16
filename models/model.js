const db = require("../db/connection")

const fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then((result) => result.rows)
    .catch((err => console.log(err)))
}


module.exports = { fetchCategories } 