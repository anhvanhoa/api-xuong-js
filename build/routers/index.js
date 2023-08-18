"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("./products"));
const account_1 = __importDefault(require("./account"));
function routers(app) {
    app.use('/api/products', products_1.default);
    app.use('/api/account', account_1.default);
}
exports.default = routers;
