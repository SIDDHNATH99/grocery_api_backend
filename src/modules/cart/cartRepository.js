const pool = require('../../database/dbconfig')

module.exports = {

    getcartitems: async (id) => {

        let result = await pool.query(`select name , price , stock from cart as c
            join products p
            on c.product_id = p.id
            where user_id=$1` , [id])
        return result;
    },

    addcartitems: async (data) => {

        let { product_id, user_id, quantity } = data;

        let quantitycheck = await pool.query(`select stock from products where id=$1`, [product_id])

        console.log("quantitycheck", quantitycheck.rows[0].stock);

        if (parseInt(quantitycheck.rows[0]) > parseInt(quantity)) {
            let result = pool.query(`INSERT into cart ("product_id" , "user_id" , "quantity") values ($1,$2,$3)`, [product_id, user_id, quantity])

            return result;
            
        }else{
            return false
        }


    }

}