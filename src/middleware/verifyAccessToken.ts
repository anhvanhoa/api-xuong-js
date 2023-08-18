import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PropsJwt } from '../type';
interface TypeRequest extends Request {
    user?: PropsJwt;
}

const verifyAccessToken = (req: TypeRequest, res: Response, next: NextFunction) => {
    const token: string | string[] | undefined = req.headers.token;
    const accessTokenKey: string | undefined = process.env.accessTokenKey;
    if (typeof token === 'string' && accessTokenKey) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, accessTokenKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token is not valid' });
            }
            req.user = user as PropsJwt;
            next();
        });
    } else {
        res.status(404).json({ message: "You're not authentication" });
    }
};

export default verifyAccessToken;
