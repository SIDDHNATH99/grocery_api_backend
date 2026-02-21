let repository = require('./cartRepository')

module.exports = {

    getcartitems: async (id) => {
        try {
            let result = await repository.getcartitems(id)
            return result;
        } catch (e) {
            return e;
        }
    },

    addcartitems: async (data) => {
        try {
            
            let result = await repository.addcartitems(data)
            return result;

        } catch (e) {
            return e;
        }
    }

}