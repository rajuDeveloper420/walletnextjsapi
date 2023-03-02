const mongoose = require('mongoose');

async function connectDB(){

    try {
        const MONGO_URL = 'mongodb+srv://rajudeveloper:PC98o9CrAJCvcnzc@cluster0.dfi6vdj.mongodb.net/testing?retryWrites=true&w=majority'
        await mongoose.connect(MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Connect to Mongodb successfully...');
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDB;