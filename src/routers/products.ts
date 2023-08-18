import express from 'express';
import controllerProduct from '~/controllers/products';
import verifyAdmin from '~/middleware/verifyAdmin';
const products = express.Router();

products.get('/', controllerProduct.getAll);
products.get('/:id', controllerProduct.getProduct);
products.get('/search/:content', controllerProduct.searchProduct);

// admin
products.post('/upload-product', verifyAdmin, controllerProduct.uploadProduct);
products.patch('/update-product/:id', verifyAdmin, controllerProduct.updateProduct);
products.delete('/delete-product/:id', verifyAdmin, controllerProduct.deleteProduct);

export default products;
