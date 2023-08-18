// import module
import express from 'express';
import dotenv from 'dotenv';
import configMorgan from './config/morgan';
import routers from './routers';
import connectDb from './config/connectDb';
import cookieParser from 'cookie-parser';
import cors from 'cors';
//config express
const app = express();
//config dot-env
dotenv.config();
const port = process.env.port;
// config cors
app.use(
    cors({
        origin: true,
        credentials: true, //access-control-allow-credentials:true
        optionsSuccessStatus: 200,
    }),
);
//config cookie-parser
app.use(cookieParser());
//config morgan
configMorgan(app);
app.use(express.json()); // request data json
app.use(express.urlencoded({ extended: true })); // request data body
// connect db
connectDb();
//routers
routers(app);
// Lister server
app.listen(port, () => {
    console.log('The server is running at port ' + port);
});
