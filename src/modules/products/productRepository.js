let pool = require('../../database/dbconfig')

module.exports = {

    getallProducts: async () => {

        result = await pool.query(`SELECT * FROM products`)
        console.log("result-rows", result.rows)
        return result
    },

    getproductsbyid: async (id) => {

        result = await pool.query(`SELECT * from products where id=$1`, [id])
        console.log("result", result)
        return result
    },

    create_product: async (product) => {

        let { name, price, stock } = product
        let result = await pool.query(`INSERT into PRODUCTS(name , price , stock) VALUES ($1 , $2, $3)`, [name, price, stock])
        // console.log("repo-result" , result)
        return result
    }
}