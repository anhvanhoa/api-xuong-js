"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("../controllers/products"));
const verifyAdmin_1 = __importDefault(require("../middleware/verifyAdmin"));
const products = express_1.default.Router();
products.get('/', products_1.default.getAll);
products.get('/:id', products_1.default.getProduct);
products.get('/search/:content', products_1.default.searchProduct);
// admin
products.post('/upload-product', verifyAdmin_1.default, products_1.default.uploadProduct);
products.patch('/update-product/:id', verifyAdmin_1.default, products_1.default.updateProduct);
products.delete('/delete-product/:id', verifyAdmin_1.default, products_1.default.deleteProduct);
exports.default = products;
