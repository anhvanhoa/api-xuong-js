import jwt from 'jsonwebtoken';
import { PropsJwt } from '~/type';

const generateRefreshToken = (data: PropsJwt) => {
    const refreshTokenKey: string | undefined = process.env.refreshTokenKey;
    if (refreshTokenKey) {
        return jwt.sign(data, refreshTokenKey, {
            expiresIn: '365d',
        });
    } else {
        return '';
    }
};

export default generateRefreshToken;
