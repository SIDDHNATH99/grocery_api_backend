let service = require('./cartService')

module.exports = {

    getcartitems: async (req, res, next) => {

        try {

            // console.log(req.body)
            // console.log(req.params)

            let id = req.params.id

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

            // console.log(req.body)
            let result = await service.addcartitems(req.body)
            console.log("result", result)

            if (result.rowCount !== 0) {

                res.status(200).json({
                    message: "items added to cart",
                    condition: true
                })

            } else {

                res.status(200).json({
                    message: "failed to add items to cart",
                    condition: false
                })

            }

        } catch (e) {
            next(e)
        }
    }
}