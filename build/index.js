"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import module
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("./config/morgan"));
const routers_1 = __importDefault(require("./routers"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
//config express
const app = (0, express_1.default)();
//config dot-env
dotenv_1.default.config();
const port = process.env.port;
// config cors
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
}));
//config cookie-parser
app.use((0, cookie_parser_1.default)());
//config morgan
(0, morgan_1.default)(app);
app.use(express_1.default.json()); // request data json
app.use(express_1.default.urlencoded({ extended: true })); // request data body
// connect db
(0, connectDb_1.default)();
//routers
(0, routers_1.default)(app);
// Lister server
app.listen(port, () => {
    console.log('The server is running at port ' + port);
});
