const pool = require('../../database/dbconfig')

module.exports = {

    getcartitems: async (id) => {

        let result = await pool.query(`select name , product_id , quantity , price from cart as c
            join products p
            on c.product_id = p.id
            where user_id=$1` , [id])
        
        console.log("result" , result.rows)

        return result;
    },

    findcartitems: async (userid, productid) => {

        let result = await pool.query(`select * from cart where user_id=$1 and product_id=$2`, [userid, productid])

        // console.log("result", result)

        return result;

    },

    addcartitems: async (data) => {

        // console.log(data)

        let { productid, quantity, userid } = data;

        let result = await pool.query(`INSERT into cart ("product_id" , "user_id" , "quantity") values ($1,$2,$3)`, [productid, userid, quantity])

        return result;

    },

    updateqty: async (data, newQty) => {

        // console.log(data, id)

        // let { productid, quantity, userid } = data;

        let result = await pool.query(`UPDATE cart set quantity=$1 where product_id=$2 and user_id=$3`, [newQty, data.productid, data.userid])

        return result

    },

    deletecartitems: async (client = null , updatedata) => {

        // console.log(client , updatedata)

        let db = client || pool

        let result = await db.query(`DELETE from cart where product_id=$1 and user_id=$2` , [updatedata.productid , updatedata.userid])

        // console.log("result" , result)

        return result;

    }

}