import { Express } from 'express';
import products from './products';
import account from './account';
function routers(app: Express) {
    app.use('/api/products', products);
    app.use('/api/account', account);
}

export default routers;
