"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_1 = __importDefault(require("../../models/accounts"));
const refreshToken_1 = __importDefault(require("../../models/refreshToken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateAccessToken_1 = __importDefault(require("../../utils/generateAccessToken"));
const generateRefreshToken_1 = __importDefault(require("../../utils/generateRefreshToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class account {
    async register(req, res) {
        try {
            if (!req.body.user_name || !req.body.password) {
                res.status(201).json({
                    message: 'Account fail created',
                    status: 201,
                });
            }
            else {
                const saltRounds = 10;
                const hashPass = await bcrypt_1.default.hash(Buffer.from(req.body.password), saltRounds);
                let data = {
                    ...req.body,
                    password: hashPass,
                };
                await accounts_1.default.create(data);
                res.status(200).json({
                    message: 'Account successfully created',
                    status: 200,
                });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async login(req, res) {
        try {
            const resUser = await accounts_1.default.findOne({ user_name: req.body.user_name });
            if (!resUser) {
                return res.status(403).json({
                    message: 'User is wrong',
                    status: 403,
                });
            }
            const isPassword = await bcrypt_1.default.compare(Buffer.from(req.body.password), resUser.password);
            if (!isPassword) {
                return res.status(403).json({
                    message: 'Password is wrong',
                    status: 403,
                });
            }
            if (req.body.user_name === resUser.user_name && isPassword) {
                const dataJwt = { id: resUser._id, admin: resUser.admin };
                const accessToken = (0, generateAccessToken_1.default)(dataJwt);
                const refreshToken = (0, generateRefreshToken_1.default)(dataJwt);
                await refreshToken_1.default.create({
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
        }
        catch (error) {
            return res.status(500).json({
                message: error,
                status: 500,
            });
        }
    }
    async logout(req, res) {
        try {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) {
                return res.status(403).json({
                    message: 'No tokens',
                    status: 403,
                });
            }
            const response = await refreshToken_1.default.findOne({ token: refreshToken });
            if (response) {
                await refreshToken_1.default.deleteMany({ user_id: response.user_id });
                res.status(200).json({
                    status: 200,
                    message: 'Logout is success',
                });
            }
            else {
                res.status(403).json({
                    status: 403,
                    message: 'Logout is fail',
                });
            }
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                error,
            });
        }
    }
    async refreshToken(req, res) {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken)
            return res.status(401).json({ message: "You're not authentication" });
        const isRefreshToken = await refreshToken_1.default.findOne({ token: refreshToken });
        if (isRefreshToken)
            await refreshToken_1.default.deleteOne({ token: refreshToken });
        const refreshTokenKey = process.env.refreshTokenKey;
        if (refreshTokenKey) {
            jsonwebtoken_1.default.verify(refreshToken, refreshTokenKey, async (err, user) => {
                const data = user;
                const dataJwt = {
                    id: data.id,
                    admin: data.admin,
                };
                const newAccessToken = (0, generateAccessToken_1.default)(dataJwt);
                const newRefreshToken = (0, generateRefreshToken_1.default)(dataJwt);
                await refreshToken_1.default.create({
                    token: newRefreshToken,
                    user_id: dataJwt.id,
                });
                res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            });
        }
    }
}
exports.default = new account();
