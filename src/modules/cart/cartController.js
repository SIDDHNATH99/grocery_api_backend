let service = require('./cartService')

module.exports = {

    getcartitems: async (req, res, next) => {

        try {

            // console.log(req.body)
            // console.log(req.params)

            let id = req.user.id

            let result = await service.getcartitems(id)
            // console.log("cart-result", result)

            if (result.rowCount !== 0) {

                res.status(200).json({
                    data: result.rows,
                    condition: true
                })

            } else {

                res.status(200).json({
                    data: result.rows,
                    condition: false
                })

            }

        } catch (e) {
            next(e)
        }
    },

    addcartitems: async (req, res, next) => {

        try {

            // console.log(req.body , req.user)

            let data = {
                productid: req.body.product_id,
                quantity: req.body.quantity,
                userid: req.user.id
            }
            let result = await service.addcartitems(data)

            console.log("result", result)

            res.status(200).json({
                message: result.message,
                condition: result.condition
            })

        } catch (e) {
            next(e)
        }
    },

    updatecart: async (req, res, next) => {

        try {

            // console.log("body" , req.body)
            // console.log("params" , req.params)

            let data = {
                productid: req.params.productid,
                userid: req.user.id,
                quantity: req.body.quantity
            }
            let result = await service.updateqty(data)

            // console.log("updatecart-result" , result);

            res.status(200).json({
                message: result.message,
                condition: result.condition
            })

        } catch (e) {
            next(e)
        }
    },

    deletecartitems: async (req, res, next) => {
        try {

            let data = {
                productid : parseInt(req.params.productid),
                userid : req.user.id
            }
            console.log("data" , data);
            
            let result = await service.deleteitem(data)

            console.log("result" , result)

            res.status(200).json({
                message : result.message,
                condition : result.condition
            })

        } catch (e) {
            next(e)
        }
    }

}