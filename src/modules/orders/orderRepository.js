let pool = require('../../database/dbconfig')

module.exports = {

    getordersbyid: async (id) => {
        console.log(id)
        let result = await pool.query('select * from orders where id=$1', [id])
        return result;
    },

    getallorders: async() => {
        let result = await pool.query(`select  
                        o.user_id as userid,
                        o.id as orderid,
                        ot.product_id,
                        ot.quantity,
                        ot.price_at_purchase,
                        o.total_amount,
                        o.status,
                        o.created_at
                        from orders as o
                        join order_items as ot on o.id = ot.order_id`
                    )
        return result;
    },

    addorders: async (client, total_amount, userid) => {

        let result = await client.query(`INSERT into orders (user_id , total_amount , status) VALUES ($1,$2,$3) RETURNING *`, [userid, total_amount, 'PLACED'])
        return result;

    },

    add_order_items: async(client, product_id , order_id , quantity , price) => {

        let result = await client.query(`INSERT into order_items (product_id , order_id , quantity , price_at_purchase) VALUES ($1,$2,$3,$4) RETURNING *` , [product_id , order_id , quantity , price])
        
        return result;

    },

    update_order_status: async(orderstatus , id) => {

        let result = pool.query(`UPDATE orders SET status=$1 where id=$2` , [orderstatus , id])
        return result;

    }
}