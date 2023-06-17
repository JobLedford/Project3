const mongoose = require('mongoose');

const connectMongo = async() => {
    try {          //Will have to change to Network addy when running app off my machine
        await mongoose.connect('mongoose://localhost:27017/Everything-Zen', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection error', error);
        process.exit(1); //Exit process if a fail
    }
};

module.exports = connectMongo;