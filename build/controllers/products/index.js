"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../../models/products"));
const products_2 = __importDefault(require("../../services/products"));
class products {
    async getAll(req, res) {
        const query = req.query;
        try {
            const response = await products_1.default.find(query);
            res.status(200).json(response);
        }
        catch (error) {
            res.json(error);
        }
    }
    async getProduct(req, res) {
        try {
            const response = await products_2.default.findOne(req.params.id);
            res.status(200).json(response);
        }
        catch (error) {
            res.json(error);
        }
    }
    async searchProduct(req, res) {
        try {
            const contentSearch = req.params.content;
            const a = await products_1.default.find({
                $or: [
                    { title: { $regex: contentSearch, $options: 'i' } },
                    { code_product: { $regex: contentSearch, $options: 'i' } },
                ],
            });
            res.status(200).json({ message: 'thanh cong', a });
        }
        catch (error) {
            res.json({ error });
        }
    }
    async uploadProduct(req, res) {
        const data = req.body;
        try {
            const response = await products_2.default.create(data);
            res.status(200).json(response);
        }
        catch (error) {
            res.json(error);
        }
    }
    async updateProduct(req, res) {
        const id = req.params.id;
        console.log(id);
        try {
            const response = await products_1.default.updateOne({ _id: id }, req.body);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            const response = await products_1.default.deleteOne({ _id: id });
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}
exports.default = new products();
