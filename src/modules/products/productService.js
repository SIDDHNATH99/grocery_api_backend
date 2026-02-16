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
    }

}