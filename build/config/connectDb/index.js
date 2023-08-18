"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDb() {
    const url = 'mongodb+srv://anhvanhoa:vananh2004@atlascluster.amaob65.mongodb.net/XuongJS';
    // const url: string = 'mongodb://localhost:27017/XuongJS';
    try {
        mongoose_1.default.connect(url);
        console.log('Connect success');
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = connectDb;
