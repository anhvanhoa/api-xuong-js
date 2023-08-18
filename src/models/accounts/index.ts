import mongoose, { Schema } from 'mongoose';
import { fieldUser } from '~/type';

const accounts = new Schema<fieldUser>(
    {
        user_name: { type: String, require, unique: true },
        password: { type: String, require },
        number_phone: { type: String },
        avatar: { type: String },
        last_name: { type: String },
        first_name: { type: String },
        admin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('accounts', accounts);
