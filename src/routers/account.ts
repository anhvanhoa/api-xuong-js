import express from 'express';
import controllerAccount from '~/controllers/account';
const account = express.Router();
account.post('/register', controllerAccount.register);
account.post('/login', controllerAccount.login);
account.post('/logout', controllerAccount.logout);
account.post('/refresh-token', controllerAccount.refreshToken);
export default account;
