const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url = process.env.MONGO_CONN;

try {
    mongoose.connect(mongo_url)
    console.log("Database Connected Sucessfully");

} catch(error){
    console.log('Database Connection Error:', error);
}


