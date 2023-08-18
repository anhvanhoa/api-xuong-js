import accounts from '../../models/accounts';
import bcrypt from 'bcrypt';
import { fieldUser } from '../../type';

const accountService = {
    register: async (user: fieldUser) => {
        try {
            const saltRounds = 10;
            const hashPass = await bcrypt.hash(Buffer.from(user.password), saltRounds);
            let data = {
                ...user,
                password: hashPass,
            };
            return await accounts.create(data);
        } catch (error) {
            return error;
        }
    },
};

export default accountService;
