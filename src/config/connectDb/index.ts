import mongoose from 'mongoose';

async function connectDb() {
    const url: string = 'mongodb+srv://anhvanhoa:vananh2004@atlascluster.amaob65.mongodb.net/XuongJS';
    // const url: string = 'mongodb://localhost:27017/XuongJS';
    try {
        mongoose.connect(url);
        console.log('Connect success');
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;
