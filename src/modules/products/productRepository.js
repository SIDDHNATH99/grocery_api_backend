let pool = require('../../database/dbconfig')

module.exports = {

    getallProducts: async (req, res) => {

        let dbQuery = `SELECT * FROM products`
        result = await pool.query(dbQuery)
        console.log("result-rows", result.rows)
        return result
    },

    getproductsbyid: async (id) => {

        let dbQuery = (`SELECT * from products where id=${id}`)
        result = await pool.query(dbQuery)
        console.log("result" , result)
        return result
    }
}