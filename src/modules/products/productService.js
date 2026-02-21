const repository = require('./productRepository')

module.exports = {

    getallproducts: async () => {
        try {

            let result = await repository.getallProducts()
            console.log("result-service", result.rows)

            if (result.rows.length != 0) {
                return result.rows
            } else {
                return false
            };

        } catch (e) {
            return e;
        }
    },

    getproductsbyId: async (id) => {
        try {
            // console.log(id);
            let result = await repository.getproductsbyid(id)
            // console.log(result.rows)
            if (result.rows.length != 0) {
                return result.rows
            } else {
                return false
            }
        } catch (e) {
            return e;
        }
    },

    createproduct: async (product) => {
        try {

            let result = await repository.create_product(product)
            // console.log("service-result", result)
            return result;

        } catch (e) {

            return e;
        }
    },

    updateproduct: async (product, id) => {
        try {
            let result = await repository.update_product(product, id)
            return result;
        } catch (e) {
            return e
        }
    },

    productstatus: async (status, id) => {
        try {
            // console.log(status, id)

            let result = await repository.productstatus(status, id)

            return result;

        } catch (e) {
            return e
        }
    }

}