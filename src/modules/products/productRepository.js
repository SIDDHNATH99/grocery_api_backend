let pool = require('../../database/dbconfig')

module.exports = {

    getallProducts: async () => {

        result = await pool.query(`SELECT * FROM products`)
        console.log("result-rows", result.rows)
        return result
    },

    getproductsbyid: async (id) => {

        console.log("get-products-by-id", id)

        result = await pool.query(`SELECT * from products where id=$1`, [id])
        // console.log("result", result)
        return result
    },

    create_product: async (product) => {

        let { name, price, stock } = product
        let result = await pool.query(`INSERT into products(name , price , stock) VALUES ($1 , $2, $3)`, [name, price, stock])
        // console.log("repo-result" , result)
        return result
    },

    update_product: async (product, id) => {

        // console.log(product , id)

        let result = await pool.query("UPDATE products set name=$1 , price=$2 , stock=$3 where id=$4 RETURNING *", [product.name, product.price, product.stock, id])
        // console.log("update product result" , result)
        return result

    },

    productstatus: async (status, id) => {

        let result = await pool.query(`UPDATE products set is_active=$1 where id=$2 RETURNING *`, [status, id])

        // console.log(result)

        return result

    },

    reduce_stock: async (client, stock, product_id) => {

        console.log(stock , product_id)
        
        let result = await client.query(`UPDATE products SET stock=$1 where id=$2 AND stock>=$1 
            RETURNING *`, [stock, product_id])
        
        return result

    }


}