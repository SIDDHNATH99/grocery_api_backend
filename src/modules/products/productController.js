const pool = require('../../database/dbconfig')
const service = require('./productService')

module.exports = {

    getallproducts: async (req, res, next) => {

        try {
            const products = await service.getallproducts()
            // console.log("all-products", products)

            if (products != false) {
                res.status(200).json({
                    data: products,
                    condition: true
                })
            } else {
                res.status(200).json({
                    message: "Products are not available at the moment",
                    condition: false
                })
            }

        } catch (e) {
            next(e)
        }
    },

    getproductsbyId: async (req, res, next) => {
        try {
            console.log("params", req.params.id)
            let id = req.params.id
            let product = await service.getproductsbyId(id)
            if (product !== false) {
                res.status(200).json({
                    data: product,
                    condition: true
                })
            } else {
                res.status(200).json({
                    condition: false,
                    message: "Product is not available at the moment"
                })
            }


        } catch (e) {
            next(e)
        }
    },

    createProduct: async (req, res, next) => {
        try {
            console.log("createproduct-body", req.body);

            let addproduct = await service.createproduct(req.body)
            // console.log("create-product-controller", addproduct)

            if (addproduct.rowCount === 1) {
                res.status(200).json({
                    message: "Product added successfully!",
                    condition: true
                })
            } else {
                res.status(200).json({
                    message: "Failed to add Product",
                    condition: false
                })
            }
        } catch (e) {
            next(e)
        }
    }
}