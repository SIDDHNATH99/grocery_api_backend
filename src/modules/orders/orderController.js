const service = require('./orderService')

module.exports = {

    getordersbyid: async (req, res, next) => {
        try {

            let id = req.user.id

            const result = await service.getordersbyid(id)

            res.status(200).json({
                message: result.message,
                condition: result.condition
            })

        } catch (e) {
            next(e)
        }
    },

    createorders: async (req, res, next) => {

        try {

            let data = {
                userid : req.user.id,
                orderdata : req.body
            }

            let result = await service.addorders(data)
            
            console.log("main-result" , result)

            res.status(200).json({
                message : result.message,
                condition : result.condition
            })

        } catch (e) {
            next(e)
        }
    }
}