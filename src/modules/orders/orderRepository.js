let pool = require('../../database/dbconfig')

module.exports = {

    getordersbyid: async (id) => {
        console.log(id)
        let result = await pool.query('select * from orders where user_id=$1', [id])
        return result;
    },

    addorders: async (client, total_amount, userid) => {

        let result = await client.query(`INSERT into orders (user_id , total_amount , status) VALUES ($1,$2,$3) RETURNING *`, [userid, total_amount, 'PLACED'])
        return result;

    },

    add_order_items: async(client, product_id , order_id , quantity , price) => {

        let result = await client.query(`INSERT into order_items (product_id , order_id , quantity , price_at_purchase) VALUES ($1,$2,$3,$4) RETURNING *` , [product_id , order_id , quantity , price])
        
        return result;

    }
}