import { Response, Request } from 'express';
import productsDB from '../../models/products';
import productsService from '../../services/products';
import { fieldProduct } from '../../type';
class products {
    async getAll(req: Request, res: Response) {
        const query = req.query;
        try {
            const response = await productsDB.find(query);
            res.status(200).json(response);
        } catch (error) {
            res.json(error);
        }
    }
    async getProduct(req: Request, res: Response) {
        try {
            const response = await productsService.findOne(req.params.id);
            res.status(200).json(response);
        } catch (error) {
            res.json(error);
        }
    }
    async searchProduct(req: Request, res: Response) {
        try {
            const contentSearch = req.params.content;
            const a = await productsDB.find({
                $or: [
                    { title: { $regex: contentSearch, $options: 'i' } },
                    { code_product: { $regex: contentSearch, $options: 'i' } },
                ],
            });
            res.status(200).json({ message: 'thanh cong', a });
        } catch (error) {
            res.json({ error });
        }
    }
    async uploadProduct(req: Request, res: Response) {
        const data: fieldProduct = req.body;
        try {
            const response = await productsService.create(data);
            res.status(200).json(response);
        } catch (error) {
            res.json(error);
        }
    }

    async updateProduct(req: Request, res: Response) {
        const id = req.params.id;
        console.log(id);
        try {
            const response = await productsDB.updateOne({ _id: id }, req.body);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const response = await productsDB.deleteOne({ _id: id });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new products();
