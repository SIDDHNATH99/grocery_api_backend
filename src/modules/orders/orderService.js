const repository = require('./orderRepository')
const cartrepo = require('../cart/cartRepository')
const productrepo = require('../products/productRepository')
const pool = require('../../database/dbconfig')

let orderstatusmapping = {
    "PLACED": 0,
    "CONFIRMED": 1,
    "OUT_FOR_DELIVERY": 2,
    "DELIVERED": 3
}

module.exports = {

    getordersbyid: async (id) => {

        try {

            let result = await repository.getordersbyid(id)

            if (result.rowCount != 0) {
                return ({
                    message: "Order data fetched",
                    data: result.rows,
                    condition: true
                })
            } else {
                return ({
                    message: "failed to fetch order data",
                    data: result.rows,
                    condition: false
                })
            }

        } catch (e) {

        }
    },

    getallorders: async () => {

        try {

            let result = await repository.getallorders()
            // console.log("result", result)

            if (result.rowCount != 0) {
                return ({
                    message: "All orders fetched",
                    data: result.rows,
                    condition: true
                })
            } else {
                return ({
                    message: "failed to fetch orders",
                    data: result.rows,
                    condition: false
                })
            }

        } catch (e) {

            return e

        }
    },

    update_order_status: async (orderstatus, id) => {

        try {

            let checkstatus = await repository.getordersbyid(id)
            console.log("checkstatus", checkstatus.rows[0].status)

            if (checkstatus.rowCount != 0) {

                let current = checkstatus.rows[0].status
                console.log(current)

                let currentposition = orderstatusmapping[current]
                console.log("currentposition", currentposition)

                let orderstatusposition = orderstatusmapping[orderstatus]
                console.log("orderstatusposition", orderstatusposition)

                if (orderstatusposition == currentposition + 1) {

                    let result = await repository.update_order_status(orderstatus, id)
                    console.log("result", result.rowCount)

                    return ({
                        message: "order updated successfully",
                        condition: true
                    })

                } else {

                    return ({
                        message: "order status in not correct, Please get the correct status",
                        condition: false
                    })
                }

            } else {
                return ({
                    message: "No order found with this id",
                    condition: false
                })
            }

        } catch (e) {
            return e
        }
    },

    addorders: async (data) => {

        console.log("service-data", data)

        let orderdata = data.orderdata

        let cartitems = await cartrepo.getcartitems(data.userid)

        console.log("cartitems", cartitems.rows)

        if (cartitems.rows.length !== 0) {

            console.log("cart is correct")

            let existingstock = await productrepo.getproductsbyid(orderdata.product_id)

            console.log("existingstock", existingstock.rows)

            let qty = existingstock.rows[0].stock
            let is_active = existingstock.rows[0].is_active
            let price = existingstock.rows[0].price
            let newqty = parseInt(qty) - parseInt(orderdata.quantity)

            if (is_active) {

                if (qty >= orderdata.quantity) {

                    let total_amount = parseInt(orderdata.quantity) * parseInt(price);

                    console.log("total_amount", total_amount)

                    let client = await pool.connect()

                    try {

                        await client.query("BEGIN")

                        let result = await productrepo.reduce_stock(client, newqty, orderdata.product_id)

                        console.log("result", result.rowCount)

                        if (result.rowCount === 0) return ({ message: "failed to update stock", condition: false })

                        let insertorder = await repository.addorders(client, total_amount, data.userid)

                        console.log("insert-order", insertorder.rowCount);

                        if (insertorder.rowCount === 0) return ({ message: "failed to add orders", condition: false })

                        let insert_order_items = await repository.add_order_items(client, orderdata.product_id, insertorder.rows[0].id, orderdata.quantity, price)

                        console.log("insert_order_items", insert_order_items.rowCount)

                        if (insert_order_items.rowCount === 0) return ({ message: "failed to add order_items", condition: false })

                        let deletedata = {
                            productid: orderdata.product_id,
                            userid: data.userid
                        }
                        let deletecartitems = await cartrepo.deletecartitems(client, deletedata)

                        console.log("deletecartitems", deletecartitems.rowCount)

                        if (deletecartitems.rowCount === 0) return ({ message: "failed to delete cart items", condition: false })

                        await client.query("COMMIT")

                        return ({
                            message: "Order Placed Successfully",
                            condition: true
                        })

                    } catch (e) {

                        console.log(e)
                        await client.query("ROLLBACK")

                        return ({
                            message: "failed to place order",
                            condition: false
                        })

                    } finally {

                        await client.release()

                    }

                } else {

                    return ({
                        message: "Required stock is not available, Please try again later",
                        condition: false
                    })
                }
            } else {
                return ({
                    message: "Product is not available right now",
                    condition: false
                })
            }

        } else {
            return ({
                message: "Cart is empty, Please add some items",
                condition: false
            })
        }

    }
}