import jwt from 'jsonwebtoken';
import { PropsJwt } from '~/type';

const generateAccessToken = (data: PropsJwt) => {
    const accessTokenKey: string | undefined = process.env.accessTokenKey;
    if (accessTokenKey) {
        return jwt.sign(data, accessTokenKey, {
            expiresIn: '50s',
        });
    }
};

export default generateAccessToken;
