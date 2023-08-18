import { Response, Request } from 'express';
import accounts from '~/models/accounts';
import refreshTokenModels from '~/models/refreshToken';
import bcrypt from 'bcrypt';
import { PropsJwt } from '~/type';
import generateAccessToken from '~/utils/generateAccessToken';
import generateRefreshToken from '~/utils/generateRefreshToken';
import jwt from 'jsonwebtoken';

class account {
    async register(req: Request, res: Response) {
        try {
            if (!req.body.user_name || !req.body.password) {
                res.status(201).json({
                    message: 'Account fail created',
                    status: 201,
                });
            } else {
                const saltRounds = 10;
                const hashPass = await bcrypt.hash(Buffer.from(req.body.password), saltRounds);
                let data = {
                    ...req.body,
                    password: hashPass,
                };
                await accounts.create(data);
                res.status(200).json({
                    message: 'Account successfully created',
                    status: 200,
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async login(req: Request, res: Response) {
        try {
            const resUser = await accounts.findOne({ user_name: req.body.user_name });
            if (!resUser) {
                return res.status(403).json({
                    message: 'User is wrong',
                    status: 403,
                });
            }
            const isPassword = await bcrypt.compare(Buffer.from(req.body.password), resUser.password);
            if (!isPassword) {
                return res.status(403).json({
                    message: 'Password is wrong',
                    status: 403,
                });
            }
            if (req.body.user_name === resUser.user_name && isPassword) {
                const dataJwt: PropsJwt = { id: resUser._id, admin: resUser.admin };
                const accessToken = generateAccessToken(dataJwt);
                const refreshToken: string = generateRefreshToken(dataJwt);
                await refreshTokenModels.create({
                    token: refreshToken,
                    user_id: dataJwt.id,
                });
                const { user_name, _id, admin, avatar, first_name, last_name } = resUser;
                return res.status(200).json({
                    message: 'Logged in successfully',
                    status: 200,
                    data: { user_name, _id, admin, avatar, first_name, last_name, accessToken, refreshToken },
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: error,
                status: 500,
            });
        }
    }
    async logout(req: Request, res: Response) {
        try {
            const refreshToken: string = req.body.refreshToken;
            if (!refreshToken) {
                return res.status(403).json({
                    message: 'No tokens',
                    status: 403,
                });
            }
            const response = await refreshTokenModels.findOne({ token: refreshToken });
            if (response) {
                await refreshTokenModels.deleteMany({ user_id: response.user_id });
                res.status(200).json({
                    status: 200,
                    message: 'Logout is success',
                });
            } else {
                res.status(403).json({
                    status: 403,
                    message: 'Logout is fail',
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                error,
            });
        }
    }

    async refreshToken(req: Request, res: Response) {
        const refreshToken: string = req.body.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: "You're not authentication" });
        const isRefreshToken = await refreshTokenModels.findOne({ token: refreshToken });
        if (isRefreshToken) await refreshTokenModels.deleteOne({ token: refreshToken });
        const refreshTokenKey: string | undefined = process.env.refreshTokenKey;
        if (refreshTokenKey) {
            jwt.verify(refreshToken, refreshTokenKey, async (err, user) => {
                const data = user as PropsJwt;
                const dataJwt: PropsJwt = {
                    id: data.id,
                    admin: data.admin,
                };
                const newAccessToken = generateAccessToken(dataJwt);
                const newRefreshToken = generateRefreshToken(dataJwt);
                await refreshTokenModels.create({
                    token: newRefreshToken,
                    user_id: dataJwt.id,
                });
                res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            });
        }
    }
}

export default new account();
