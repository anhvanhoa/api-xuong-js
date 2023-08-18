import mongoose, { Schema } from 'mongoose';

const products = new Schema(
    {
        title: { type: String, require },
        price: { type: Number, require },
        code_product: { type: String, require, unique: true },
        thumbnail: { type: String, require },
        list_image: { type: Array },
        gender: { type: String, default: 'both' },
        status: { type: String, default: 'New Arrival' },
        color: { type: [{ code: { type: String }, amount: { type: Number } }] },
        size: { type: Array },
        info: { type: String },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('products', products);
