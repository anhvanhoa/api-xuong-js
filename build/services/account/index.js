"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_1 = __importDefault(require("../../models/accounts"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const accountService = {
    register: async (user) => {
        try {
            const saltRounds = 10;
            const hashPass = await bcrypt_1.default.hash(Buffer.from(user.password), saltRounds);
            let data = {
                ...user,
                password: hashPass,
            };
            return await accounts_1.default.create(data);
        }
        catch (error) {
            return error;
        }
    },
};
exports.default = accountService;
