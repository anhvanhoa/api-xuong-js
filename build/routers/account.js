"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("../controllers/account"));
const account = express_1.default.Router();
account.post('/register', account_1.default.register);
account.post('/login', account_1.default.login);
account.post('/logout', account_1.default.logout);
account.post('/refresh-token', account_1.default.refreshToken);
exports.default = account;
