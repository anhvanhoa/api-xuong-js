import verifyAccessToken from '~/middleware/verifyAccessToken';
import refreshToken from '~/models/refreshToken';
import { Request, Response, NextFunction } from 'express';
import { PropsJwt } from '~/type';
interface TypeRequest extends Request {
    user?: PropsJwt;
}
const verifyAdmin = async (req: TypeRequest, res: Response, next: NextFunction) => {
    verifyAccessToken(req, res, () => {
        if (req.user?.admin) {
            next();
        } else {
            res.status(401).json({ message: 'You have no right' });
        }
    });
};

export default verifyAdmin;
