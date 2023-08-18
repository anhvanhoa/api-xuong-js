import products from '../../models/products';
import { fieldProduct } from '../../type';

const productsService = {
    create: async (product: fieldProduct) => await products.create(product),
    findOne: async (_id: String) => await products.findOne({ _id }),
};

export default productsService;
