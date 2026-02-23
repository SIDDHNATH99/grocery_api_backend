const service = require('./orderService')

module.exports = {

    getordersbyid: async (req, res, next) => {

        try {

            let id = req.params.id

            const result = await service.getordersbyid(id)

            res.status(200).json({
                message: result.message,
                data: result.data,
                condition: result.condition
            })

        } catch (e) {
            next(e)
        }
    },

    createorders: async (req, res, next) => {

        try {

            let data = {
                userid: req.user.id,
                orderdata: req.body
            }

            let result = await service.addorders(data)

            console.log("main-result", result)

            res.status(200).json({
                message: result.message,
                condition: result.condition
            })

        } catch (e) {
            next(e)
        }
    },

    getallorders: async (req, res, next) => {

        try {
            // console.log("get-allorders")

            const result = await service.getallorders()

            res.status(200).json({
                message: result.message,
                data: result.data,
                condition: result.condition
            })

        } catch (e) {
            next(e)
        }
    },

    update_orderstatus: async (req, res, next) => {

        try {

            let orderid = req.params.id
            let orderstatus = req.params.status

            let result = await service.update_order_status(orderstatus , orderid)
            
            console.log(result)

            res.status(200).json({
                message : result.message,
                condition : result.condition
            })

        } catch (e) {
            next(e)
        }
    }
}