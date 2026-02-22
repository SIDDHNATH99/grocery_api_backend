let repository = require('./cartRepository')
let productRepository = require("../products/productRepository");

module.exports = {

    getcartitems: async (id) => {
        try {
            
            console.log("id" , id)

            let result = await repository.getcartitems(id)
            return result;
        } catch (e) {
            return e;
        }
    },

    addcartitems: async (data) => {

        try {

            // console.log("data", data)

            let qtycheck = await productRepository.getproductsbyid(data.productid)

            // console.log("qtycheck", qtycheck.rows[0])

            if (qtycheck.rows[0].length !== 0 && qtycheck.rows[0].is_active) {

                let cart = await repository.findcartitems(data.userid, data.productid)

                console.log("add-to-cart-rows", cart.rows[0])

                let existingQty = cart.rows.length != 0 ? cart.rows[0].quantity : 0

                console.log("existingQty", existingQty)

                let newQty = existingQty + data.quantity;

                // console.log("newQty", newQty)

                if (qtycheck.rows[0].stock > newQty) {

                    if (cart.rows.length != 0) {

                        await repository.updateqty(data, newQty)

                        return ({
                            message: "Items quantity updated successfully",
                            condition: true
                        })


                    } else {

                        await repository.addcartitems(data)

                        return ({
                            message: "Items added to cart successfully",
                            condition: true
                        })

                    }

                } else {

                    return ({
                        message: "Requested quantity for product is not available",
                        condition: false
                    })
                }

            } else {
                return ({
                    message: "Requested product is not available",
                    condition: false
                })
            }

        } catch (e) {
            return e;

        }
    },

    updateqty: async (updatedata) => {

        try {

            // console.log("updatedata", updatedata)

            let existing = await productRepository.getproductsbyid(updatedata.productid)

            // console.log("existing", existing.rows[0])

            let is_active = existing.rows[0].is_active

            if (is_active && existing.rows[0].length !== 0) {

                // console.log("product is existing & active")
                let cart = await repository.findcartitems(updatedata.userid, updatedata.productid)

                console.log("cart", cart.rows.length)

                if (cart.rows.length != 0) {

                    if (updatedata.quantity < 0) {

                        return ({
                            message: "invalid update request",
                            condition: false
                        })

                    } else {

                        if (updatedata.quantity === 0) {

                            await repository.deletecartitems(updatedata)

                            return ({
                                message: "updated quantity to 0 & removed item successfully",
                                condition: true
                            })

                        } else {

                            await repository.updateqty(updatedata, updatedata.quantity)

                            return ({
                                message: "updated quantity for this item",
                                condition: true
                            })

                        }
                    }

                } else {

                    return ({
                        message: "cart is empty, please add into cart",
                        condition: false
                    })

                }

            }

        } catch (e) {
            // console.log(e)
            return e;
        }

    },

    deleteitem: async (data) => {

        try {

            let finditem = await repository.findcartitems(data.userid, data.productid)

            // console.log("finditem", finditem.rows)

            if (finditem.rows.length !== 0) {

                await repository.deletecartitems(data)

                return ({
                    message: "Item deleted successfully",
                    condition: true
                })

            } else {

                return ({
                    message: "Requested item not found in the cart",
                    condition: false
                })
            }

        } catch (e) {
            return e
        }
    }

}