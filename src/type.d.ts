import { ObjectId } from 'mongoose';
interface fieldProduct {
    title: String;
    price: Number;
    code_product: String;
    thumbnail: String;
    list_image: Array;
    status?: String;
    color?: [{ type: String; amount: Number }];
    size?: Array;
    info: String;
}

interface fieldUser {
    _id: ObjectId;
    user_name: string;
    password: string;
    number_phone?: string;
    avatar?: string;
    last_name?: string;
    first_name?: string;
    admin: boolean;
}

interface PropsJwt {
    id: ObjectId;
    admin: boolean;
}

export { fieldProduct, fieldUser, PropsJwt };
