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
    },

    updateProduct: async (req, res, next) => {
        try {

            console.log(req.body, req.params);

            let id = req.params.id

            let updateproduct = await service.updateproduct(req.body, id)
            console.log("controller-result", updateproduct.rowCount)

            if (updateproduct.rowCount === 1) {
                res.status(200).json({
                    message: "Product updated successfully!",
                    condition: true
                })
            } else {
                res.status(200).json({
                    message: "Failed to update Product",
                    condition: false
                })
            }

        } catch (e) {
            next(e)
        }
    },

    productstatus: async (req, res, next) => {
        try {
            // console.log(req.body)
            // console.log(req.params)

            let status = req.body.status
            let id = req.params.id

            let result = await service.productstatus(status, id)
            console.log("result", result.rowCount)

            if (result.rowCount === 1) {
                res.status(200).json({
                    message: "Product status updated successfully",
                    condition: true
                })
            } else {
                res.status(200).json({
                    message: "Failed to update product status",
                    condition: false
                })
            }

        } catch (e) {
            next(e)
        }
    }
}