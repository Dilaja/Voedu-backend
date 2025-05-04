const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected successfully ...');
    } catch (error) {
        console.error('Connection Failed:', error);
        
    }
};
module.exports = connectDB;
